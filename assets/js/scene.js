// =====================================================================
//  3D-ACHTERGROND (Three.js)
//  Een langzaam vervormende, iriserende vorm met een veld van fijne deeltjes.
//  - draait mee met de muis en beweegt mee met het scrollen
//  - op de homepage groot in beeld, op andere pagina's klein in de hoek
//  - geen WebGL? Dan een zachte gloed via CSS (klasse "no-webgl")
//  - "minder beweging" aan? Dan één stilstaand beeld
// =====================================================================
(() => {
    const root = document.documentElement;
    const calm = matchMedia("(prefers-reduced-motion: reduce)").matches;

    function supportsWebGL() {
        try { const c = document.createElement("canvas"); return Boolean(window.WebGLRenderingContext && (c.getContext("webgl2") || c.getContext("webgl"))); }
        catch (e) { return false; }
    }
    if (!window.THREE || !supportsWebGL()) {
        root.classList.add("no-webgl");
        window.Scene = { setPage() {} };
        return;
    }

    const THREE = window.THREE;
    const canvas = document.createElement("canvas");
    canvas.id = "scene";
    canvas.setAttribute("aria-hidden", "true");
    document.body.prepend(canvas);

    const renderer = new THREE.WebGLRenderer({ canvas, antialias: (devicePixelRatio || 1) < 2,   // scherp scherm: antialias niet nodig, scheelt GPU
        alpha: true, powerPreference: "high-performance" });
    renderer.setClearColor(0x000000, 0);
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(35, 1, 0.1, 100);
    camera.position.set(0, 0, 6);

    // ---------- 3D-ruis (Ashima / Stefan Gustavson, publiek domein) ----------
    const noise = `
        vec3 mod289(vec3 x){return x-floor(x*(1.0/289.0))*289.0;}
        vec4 mod289(vec4 x){return x-floor(x*(1.0/289.0))*289.0;}
        vec4 permute(vec4 x){return mod289(((x*34.0)+1.0)*x);}
        vec4 taylorInvSqrt(vec4 r){return 1.79284291400159-0.85373472095314*r;}
        float snoise(vec3 v){
            const vec2 C=vec2(1.0/6.0,1.0/3.0); const vec4 D=vec4(0.0,0.5,1.0,2.0);
            vec3 i=floor(v+dot(v,C.yyy)); vec3 x0=v-i+dot(i,C.xxx);
            vec3 g=step(x0.yzx,x0.xyz); vec3 l=1.0-g; vec3 i1=min(g.xyz,l.zxy); vec3 i2=max(g.xyz,l.zxy);
            vec3 x1=x0-i1+C.xxx; vec3 x2=x0-i2+C.yyy; vec3 x3=x0-D.yyy;
            i=mod289(i);
            vec4 p=permute(permute(permute(i.z+vec4(0.0,i1.z,i2.z,1.0))+i.y+vec4(0.0,i1.y,i2.y,1.0))+i.x+vec4(0.0,i1.x,i2.x,1.0));
            float n_=0.142857142857; vec3 ns=n_*D.wyz-D.xzx;
            vec4 j=p-49.0*floor(p*ns.z*ns.z); vec4 x_=floor(j*ns.z); vec4 y_=floor(j-7.0*x_);
            vec4 x=x_*ns.x+ns.yyyy; vec4 y=y_*ns.x+ns.yyyy; vec4 h=1.0-abs(x)-abs(y);
            vec4 b0=vec4(x.xy,y.xy); vec4 b1=vec4(x.zw,y.zw);
            vec4 s0=floor(b0)*2.0+1.0; vec4 s1=floor(b1)*2.0+1.0; vec4 sh=-step(h,vec4(0.0));
            vec4 a0=b0.xzyw+s0.xzyw*sh.xxyy; vec4 a1=b1.xzyw+s1.xzyw*sh.zzww;
            vec3 p0=vec3(a0.xy,h.x); vec3 p1=vec3(a0.zw,h.y); vec3 p2=vec3(a1.xy,h.z); vec3 p3=vec3(a1.zw,h.w);
            vec4 norm=taylorInvSqrt(vec4(dot(p0,p0),dot(p1,p1),dot(p2,p2),dot(p3,p3)));
            p0*=norm.x; p1*=norm.y; p2*=norm.z; p3*=norm.w;
            vec4 m=max(0.6-vec4(dot(x0,x0),dot(x1,x1),dot(x2,x2),dot(x3,x3)),0.0); m=m*m;
            return 42.0*dot(m*m,vec4(dot(p0,x0),dot(p1,x1),dot(p2,x2),dot(p3,x3)));
        }`;

    // ---------- de vorm ----------
    const uniforms = { uTime: { value: 0 }, uAmp: { value: 0.3 }, uGlow: { value: 1 } };
    const blobMat = new THREE.ShaderMaterial({
        uniforms,
        vertexShader: `
            uniform float uTime; uniform float uAmp;
            varying vec3 vPos; varying vec3 vNormal; varying float vNoise;
            ${noise}
            float field(vec3 n){ return snoise(n * 0.85 + uTime * 0.14) + 0.18 * snoise(n * 1.7 - uTime * 0.2); }
            vec3 shape(vec3 n){ return n * (1.0 + field(n) * uAmp); }
            void main(){
                vec3 n = normalize(position);
                vec3 p = shape(n);
                // gladde normaal: buurpunten op de vervormde vorm opnieuw berekenen
                vec3 t1 = normalize(cross(n, abs(n.y) < 0.99 ? vec3(0.0, 1.0, 0.0) : vec3(1.0, 0.0, 0.0)));
                vec3 t2 = cross(n, t1);
                float e = 0.01;
                vec3 a = shape(normalize(n + t1 * e));
                vec3 b = shape(normalize(n + t2 * e));
                vec3 nn = normalize(cross(a - p, b - p));
                if (dot(nn, n) < 0.0) nn = -nn;
                vNoise = field(n);
                vNormal = normalize(normalMatrix * nn);
                vec4 mv = modelViewMatrix * vec4(p, 1.0);
                vPos = mv.xyz;
                gl_Position = projectionMatrix * mv;
            }`,
        fragmentShader: `
            uniform float uTime; uniform float uGlow;
            varying vec3 vPos; varying vec3 vNormal; varying float vNoise;
            const vec3 YELLOW = vec3(0.99, 0.93, 0.04);
            const vec3 CYAN = vec3(0.0, 0.9, 1.0);
            void main(){
                vec3 N = normalize(vNormal);
                vec3 V = normalize(-vPos);
                float ndv = clamp(dot(N, V), 0.0, 1.0);
                float fres = pow(1.0 - ndv, 2.8);
                vec3 L1 = normalize(vec3(-0.6, 0.9, 0.7));
                vec3 L2 = normalize(vec3(0.8, -0.5, 0.4));
                float spec = pow(max(dot(reflect(-L1, N), V), 0.0), 90.0) + 0.5 * pow(max(dot(reflect(-L2, N), V), 0.0), 30.0);
                float diff = max(dot(N, L1), 0.0);
                // donkere, glanzende kern met een rand die van cyaan (onder) naar geel (boven) loopt
                vec3 rim = mix(CYAN, YELLOW, smoothstep(-0.2, 0.9, N.y + vNoise * 0.4 + sin(uTime * 0.3) * 0.15));
                vec3 col = vec3(0.014, 0.017, 0.026) + diff * 0.05;
                col += rim * fres * 1.15 * uGlow;
                col += CYAN * 0.015;
                // fijne horizontale "scan"-lijnen over het oppervlak (holografisch, heel subtiel)
                float scan = smoothstep(0.92, 1.0, sin(vPos.y * 60.0 - uTime * 2.0) * 0.5 + 0.5);
                col += CYAN * scan * fres * 0.25 * uGlow;
                col += vec3(1.0) * spec * 0.9;
                col = col / (col + 0.8) * 1.6;
                gl_FragColor = vec4(col, 1.0);
            }`
    });
    const blob = new THREE.Mesh(new THREE.IcosahedronGeometry(1, 48), blobMat);
    scene.add(blob);

    // ---------- draadmodel-schil om de vorm (draait de andere kant op) ----------
    const wire = new THREE.LineSegments(
        new THREE.EdgesGeometry(new THREE.IcosahedronGeometry(1.42, 1)),
        new THREE.LineBasicMaterial({ color: 0x00e5ff, transparent: true, opacity: 0.22, depthWrite: false })
    );
    scene.add(wire);
    const ring = new THREE.Mesh(
        new THREE.TorusGeometry(1.7, 0.004, 8, 160),
        new THREE.MeshBasicMaterial({ color: 0xfcee0a, transparent: true, opacity: 0.55, depthWrite: false })
    );
    scene.add(ring);

    // ---------- perspectiefraster als vloer (synthwave, maar ingetogen) ----------
    const gridMat = new THREE.ShaderMaterial({
        transparent: true, depthWrite: false,
        uniforms: { uTime: { value: 0 }, uFade: { value: 1 } },
        vertexShader: `varying vec2 vUv; varying float vDepth;
            void main(){ vUv = uv; vec4 mv = modelViewMatrix * vec4(position, 1.0); vDepth = -mv.z; gl_Position = projectionMatrix * mv; }`,
        fragmentShader: `uniform float uTime; uniform float uFade; varying vec2 vUv; varying float vDepth;
            // 1 precies op een rasterlijn, 0 daartussen
            float line(float v, float w){ float d = abs(fract(v) - 0.5); return smoothstep(w, 0.0, 0.5 - d); }
            void main(){
                vec2 g = vUv * vec2(40.0, 40.0);
                g.y += uTime * 0.6;                                 // raster glijdt naar je toe
                float l = max(line(g.x, 0.025), line(g.y, 0.025));
                float fade = smoothstep(26.0, 4.0, vDepth) * smoothstep(1.0, 4.0, vDepth);
                vec3 c = mix(vec3(0.0, 0.9, 1.0), vec3(0.99, 0.93, 0.04), smoothstep(0.35, 0.75, vUv.y)) ;
                gl_FragColor = vec4(c, l * fade * 0.35 * uFade);
            }`
    });
    const grid = new THREE.Mesh(new THREE.PlaneGeometry(60, 60, 1, 1), gridMat);
    grid.rotation.x = -Math.PI / 2;
    grid.position.set(0, -2.1, -8);
    scene.add(grid);

    // ---------- twee extra objecten op de achtergrond ----------
    // 1) een kleine tweede hologram-vorm (zelfde shader, eigen helderheid)
    const miniUniforms = { uTime: { value: 0 }, uAmp: { value: 0.38 }, uGlow: { value: 0.7 } };
    const miniMat = blobMat.clone();
    miniMat.uniforms = miniUniforms;
    const mini = new THREE.Mesh(new THREE.IcosahedronGeometry(1, 24), miniMat);
    scene.add(mini);
    // 2) een langzaam draaiende draadmodel-knoop in geel
    const knot = new THREE.Mesh(
        new THREE.TorusKnotGeometry(0.55, 0.16, 140, 10, 2, 3),
        new THREE.MeshBasicMaterial({ color: 0xfcee0a, wireframe: true, transparent: true, opacity: 0.08, depthWrite: false })
    );
    scene.add(knot);

    // ---------- nog meer objecten op de achtergrond (subtiel, aan de randen) ----------
    const lineMat = (color, opacity) => new THREE.LineBasicMaterial({ color, transparent: true, opacity, depthWrite: false });
    const edges = (geo, color, opacity) => new THREE.LineSegments(new THREE.EdgesGeometry(geo), lineMat(color, opacity));
    // 3) cyaan draadmodel-octaëder (ruitvorm)
    const octa = edges(new THREE.OctahedronGeometry(1, 0), 0x00e5ff, 0.32);
    // 4) "datablok": een draadmodel-kubus met een klein geel blokje erin
    const cube = new THREE.Group();
    cube.add(edges(new THREE.BoxGeometry(1, 1, 1), 0x00e5ff, 0.26));
    const core = new THREE.Mesh(new THREE.BoxGeometry(0.32, 0.32, 0.32), new THREE.MeshBasicMaterial({ color: 0xfcee0a, transparent: true, opacity: 0.55 }));
    cube.add(core);
    // 5) grote, schuine baan-ring ver weg
    const halo = new THREE.Mesh(new THREE.TorusGeometry(1, 0.006, 6, 180), new THREE.MeshBasicMaterial({ color: 0xfcee0a, transparent: true, opacity: 0.22, depthWrite: false }));
    // 6) cyaan draadmodel-dodecaëder
    const dodeca = edges(new THREE.DodecahedronGeometry(1, 0), 0x00e5ff, 0.16);
    // 7) derde kleine hologram-vorm
    const mini2Uniforms = { uTime: { value: 0 }, uAmp: { value: 0.42 }, uGlow: { value: 0.55 } };
    const mini2Mat = blobMat.clone();
    mini2Mat.uniforms = mini2Uniforms;
    const mini2 = new THREE.Mesh(new THREE.IcosahedronGeometry(1, 20), mini2Mat);
    [octa, cube, halo, dodeca, mini2].forEach(o => scene.add(o));

    // plek (in schermmaten, -0.5 .. 0.5), diepte z, grootte en hoe snel ze meeschuiven met scrollen (parallax)
    const EXTRAS = [
        { obj: mini,   x: -0.44, y: -0.44, z: -1.5, s: 0.26, speed: 0.22, spin: 0.25 },
        { obj: knot,   x: 0.16,  y: 0.4,   z: -2.5, s: 0.42, speed: 0.12, spin: 0.12 },
        { obj: octa,   x: 0.42,  y: -0.36, z: -2,   s: 0.34, speed: 0.3,  spin: 0.3 },
        { obj: cube,   x: 0.12,  y: -0.38, z: -3,   s: 0.34, speed: 0.18, spin: 0.2 },
        { obj: halo,   x: -0.12, y: -0.46, z: -4.5, s: 1.1,  speed: 0.08, spin: 0.05 },
        { obj: dodeca, x: -0.28, y: 0.4,   z: -3.5, s: 0.5,  speed: 0.1,  spin: 0.08 },
        { obj: mini2,  x: 0.46,  y: 0.08,  z: -2.5, s: 0.2,  speed: 0.26, spin: 0.3 }
    ];
    // binnen een vaste band laten "rondgaan", zodat ze op elke hoogte van de pagina terugkomen
    const wrap = v => ((v + 0.75) % 1.5 + 1.5) % 1.5 - 0.75;

    // ---------- fijne deeltjes ----------
    const COUNT = innerWidth < 760 ? 700 : 1600;
    const pos = new Float32Array(COUNT * 3);
    for (let i = 0; i < COUNT; i++) {
        const r = 2.2 + Math.random() * 6;
        const th = Math.random() * Math.PI * 2, ph = Math.acos(2 * Math.random() - 1);
        pos[i * 3] = r * Math.sin(ph) * Math.cos(th);
        pos[i * 3 + 1] = r * Math.sin(ph) * Math.sin(th) * 0.7;
        pos[i * 3 + 2] = r * Math.cos(ph) - 2;
    }
    const dustGeo = new THREE.BufferGeometry();
    dustGeo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    const dust = new THREE.Points(dustGeo, new THREE.PointsMaterial({ color: 0x9fefff, size: 0.016, sizeAttenuation: true, transparent: true, opacity: 0.45, depthWrite: false }));
    scene.add(dust);

    // ---------- plek per pagina ----------
    // x/y in "schermbreedtes" (wordt omgerekend naar de camera), s = grootte, glow = helderheid
    const LAYOUTS = {
        index:    { x: 0.24, y: 0.06, s: 0.92, glow: 1.0, amp: 0.3 },
        projects: { x: 0.4,  y: 0.33, s: 0.48, glow: 0.75, amp: 0.26 },
        skills:   { x: 0.4,  y: 0.33, s: 0.48, glow: 0.75, amp: 0.26 },
        about:    { x: 0.42, y: 0.34, s: 0.42, glow: 0.7,  amp: 0.24 },
        contact:  { x: 0.45, y: 0.4,  s: 0.36, glow: 0.75, amp: 0.3 }
    };
    let target = LAYOUTS[document.body.dataset.page] || LAYOUTS.index;
    const cur = { ...target, x: target.x, y: target.y - 0.3, s: target.s * 0.6 };   // komt binnen vanaf onder
    let page = document.body.dataset.page || "index";

    // ---------- muis en scroll ----------
    const mouse = { x: 0, y: 0, tx: 0, ty: 0 };
    addEventListener("pointermove", e => { mouse.tx = e.clientX / innerWidth - 0.5; mouse.ty = e.clientY / innerHeight - 0.5; }, { passive: true });

    // breedte van het beeld op de afstand van de vorm (voor plaatsing in schermmaten)
    let viewW = 1, viewH = 1;
    function resize() {
        const w = innerWidth, h = innerHeight;
        renderer.setPixelRatio(Math.min(devicePixelRatio || 1, 1.75));
        renderer.setSize(w, h, false);
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
        viewH = 2 * Math.tan((camera.fov * Math.PI / 180) / 2) * camera.position.z;
        viewW = viewH * camera.aspect;
        // smal scherm (telefoon): kleiner en hoger, achter de naam, zodat de tekst leesbaar blijft
        const small = w < 760;
        Object.assign(LAYOUTS.index, small ? { x: 0.2, y: 0.22, s: 0.36, glow: 0.85 } : { x: 0.24, y: 0.06, s: 0.92, glow: 1 });
        ["projects", "skills", "about", "contact"].forEach(k => { if (small) Object.assign(LAYOUTS[k], { x: 0.3, y: 0.36, s: 0.3 }); });
    }
    addEventListener("resize", resize);
    resize();

    // ---------- animatie ----------
    let last = performance.now(), running = false, t = Math.random() * 100;
    function frame(now) {
        const dt = Math.min(0.05, (now - last) / 1000);
        last = now;
        t += dt;
        const k = 1 - Math.exp(-dt * 2.2);   // zachte overgang tussen pagina's

        mouse.x += (mouse.tx - mouse.x) * (1 - Math.exp(-dt * 3));
        mouse.y += (mouse.ty - mouse.y) * (1 - Math.exp(-dt * 3));

        // op de homepage schuift de vorm bij het scrollen naar rechtsboven, wordt kleiner en zachter,
        // zodat hij niet over de tekst verderop komt te staan
        const sp = page === "index" ? Math.min(1, scrollY / innerHeight) : 0;
        const tx = target.x + sp * 0.34, ty = target.y + sp * 0.02, ts = target.s * (1 - sp * 0.4);
        cur.x += (tx - cur.x) * k; cur.y += (ty - cur.y) * k; cur.s += (ts - cur.s) * k;
        cur.glow += (target.glow * (1 - sp * 0.55) - cur.glow) * k; cur.amp += (target.amp - cur.amp) * k;

        blob.position.set(cur.x * viewW, cur.y * viewH, 0);
        blob.scale.setScalar(cur.s);
        blob.rotation.y = t * 0.08 + mouse.x * 0.8;
        blob.rotation.x = t * 0.05 + mouse.y * 0.6 + sp * 0.6;
        uniforms.uTime.value = t;
        uniforms.uAmp.value = cur.amp;
        uniforms.uGlow.value = cur.glow;

        // draadmodel en ring volgen de vorm, maar draaien rustig hun eigen kant op
        wire.position.copy(blob.position);
        wire.scale.setScalar(cur.s);
        wire.rotation.set(-t * 0.06 + mouse.y * 0.3, -t * 0.09 - mouse.x * 0.4, 0);
        ring.position.copy(blob.position);
        ring.scale.setScalar(cur.s);
        ring.rotation.set(1.25 + mouse.y * 0.2, 0.3 + Math.sin(t * 0.2) * 0.15, t * 0.1);
        // raster: zichtbaar op de homepage, verdwijnt rustig als je verder scrolt of op een andere pagina bent
        gridMat.uniforms.uTime.value = t;
        const gridTarget = page === "index" ? 1 - sp * 0.8 : 0.35;
        gridMat.uniforms.uFade.value += (gridTarget - gridMat.uniforms.uFade.value) * k;

        // extra objecten: zweven rustig, draaien en schuiven elk met hun eigen snelheid mee met scrollen
        const scrolled = scrollY / innerHeight;
        miniUniforms.uTime.value = t * 1.3 + 40;
        mini2Uniforms.uTime.value = t * 1.1 + 90;
        core.rotation.set(-t * 0.8, t * 0.6, 0);
        EXTRAS.forEach((e, i) => {
            const bob = Math.sin(t * 0.4 + i * 2) * 0.02;
            // verder weg = kleiner op het scherm; daarom de plek omrekenen zodat hij op de gekozen schermplek blijft
            const depth = (camera.position.z - e.z) / camera.position.z;
            const px = e.x + mouse.x * 0.02 * (1 + i % 3);
            e.obj.position.set(px * viewW * depth, wrap(e.y + scrolled * e.speed + bob) * viewH * depth, e.z);
            e.obj.scale.setScalar(e.s * (viewW < 3 ? 0.65 : 1));
            e.obj.rotation.set(t * e.spin * 0.6 + mouse.y * 0.3, t * e.spin + mouse.x * 0.4, t * e.spin * 0.3);
        });
        halo.rotation.set(1.2 + mouse.y * 0.1, 0.4, t * 0.05);   // ring blijft schuin liggen en draait rustig rond

        dust.rotation.y = t * 0.012 + mouse.x * 0.15;
        dust.rotation.x = mouse.y * 0.08;
        dust.position.y = sp * 0.6;
        camera.position.x = mouse.x * 0.25;
        camera.position.y = -mouse.y * 0.18;
        camera.lookAt(0, 0, 0);

        renderer.render(scene, camera);
        if (running) requestAnimationFrame(frame);
    }
    function start() { if (running || calm) return; running = true; last = performance.now(); requestAnimationFrame(frame); }
    function stop() { running = false; }
    document.addEventListener("visibilitychange", () => (document.hidden ? stop() : start()));

    if (calm) { Object.assign(cur, target); frame(performance.now()); }
    else start();
    // rustig infaden zodra het eerste beeld klaar is (ook als het tabblad op de achtergrond opent)
    const ready = () => canvas.classList.add("ready");
    requestAnimationFrame(ready);
    setTimeout(ready, 400);

    window.Scene = {
        setPage(name) {
            page = name || "index";
            target = LAYOUTS[page] || LAYOUTS.index;
            if (calm) { Object.assign(cur, target); frame(performance.now()); }
        }
    };
})();
