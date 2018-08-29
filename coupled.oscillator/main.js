// "Coupled Harmonic Oscillator" by A. Freddie Page, Imperial College London © 2017
//  https://fourier.space
const MODULE = (function () {
  "use strict";
  const that = {};
  let cParams = {"ω1": 5, "ω2": 0};
  let dParams = {};
  let t=0;

  const el = id => document.getElementById(id);

  that.page = 0;
  // Alter pages.json, then copy the stringified here.
  that.pages = [{"id":"intro1","ω1":5,"ω2":3,"ωJ":7,"m1":10,"m2":10,"A1":0.66,"A2":1,"hide":["grControl1","grControlJ","grControl2","grCircular1","grCircular2","grJGraph","grCircularU1","grCircularU2","grSpringU1","grSpringU2"],"show":["grText","grSpring1","grSpringJ","grSpring2"]},{"id":"intro2","ω1":5,"ω2":3,"ωJ":0,"m1":10,"m2":10,"A1":1,"A2":0,"hide":["grSpringJ","grSpring2"]},{"id":"intro3","ω1":5,"ω2":3,"ωJ":0,"m1":10,"m2":10,"A1":1,"A2":0,"show":["grControl1"]},{"id":"intro4","ω1":5,"ω2":3,"ωJ":0,"m1":10,"m2":10,"A1":1,"A2":0,"show":["grCircular1"]},{"id":"twoMasses1","ω1":5,"ω2":3,"ωJ":0,"m1":10,"m2":10,"A1":1,"A2":-0.66,"show":["grSpring2","grControl2","grCircular2"]},{"id":"twoMasses2","ω1":5,"ω2":3,"ωJ":0,"m1":10,"m2":10,"A1":1,"A2":0},{"id":"twoMasses3","ω1":5,"ω2":3,"ωJ":0,"m1":10,"m2":10,"A1":0,"A2":-0.66},{"id":"twoMasses4","ω1":5,"ω2":3,"ωJ":0,"m1":10,"m2":10,"A1":1,"A2":-0.66},{"id":"coupled1","ω1":5,"ω2":3,"ωJ":7,"m1":10,"m2":10,"A1":0,"A2":0,"show":["grSpringJ"]},{"id":"coupled2","ω1":5,"ω2":3,"ωJ":7,"m1":10,"m2":10,"A1":0.6,"A2":1.2,"φ1":0},{"id":"coupled3","ω1":5,"ω2":3,"ωJ":7,"m1":10,"m2":10,"A1":0.6,"A2":1.2},{"id":"coupled4","ω1":5,"ω2":3,"ωJ":7,"m1":10,"m2":10,"A1":0.6,"A2":1.2,"show":["grControlJ"]},{"id":"coupled5","ω1":1.5,"ω2":0.5,"ωJ":20,"m1":10,"m2":10,"A1":0,"A2":1},{"id":"coupled6","ω1":1.5,"ω2":0.5,"ωJ":20,"m1":10,"m2":10,"A1":0,"A2":1},{"id":"coupled7","ω1":1.5,"ω2":0.5,"ωJ":20,"m1":10,"m2":10,"A1":0.25,"A2":0},{"id":"coupled8","ω1":1.5,"ω2":0.5,"ωJ":20,"m1":10,"m2":10,"A1":0.25,"A2":1},{"id":"coupled9","ω1":5,"ω2":3,"ωJ":7,"m1":10,"m2":10,"A1":0.25,"A2":1,"show":["grJGraph"]},{"id":"coupled10","ω1":5,"ω2":3,"ωJ":4,"m1":10,"m2":10,"A1":1,"A2":0},{"id":"coupled11","ω1":5,"ω2":3,"ωJ":4,"m1":10,"m2":10,"A1":0,"A2":1},{"id":"masslimit1","ω1":6,"ω2":4,"ωJ":5,"m1":5,"m2":1000,"A1":1,"A2":0},{"id":"masslimit2","ω1":6,"ω2":4,"ωJ":5,"m1":5,"m2":1000,"A1":0,"A2":1},{"id":"masslimit3","ω1":4,"ω2":10,"ωJ":5,"m1":5,"m2":1000,"A1":1,"A2":0},{"id":"normalmodes1","ω1":5,"ω2":3,"ωJ":4,"m1":10,"m2":15,"A1":1,"A2":1},{"id":"normalmodes2","ω1":5,"ω2":3,"ωJ":4,"m1":10,"m2":15,"A1":1,"A2":1},{"id":"normalmodes3","ω1":5,"ω2":3,"ωJ":4,"m1":10,"m2":15,"A1":1,"A2":1},{"id":"normalmodes4","ω1":5,"ω2":3,"ωJ":4,"m1":10,"m2":15,"A1":1,"A2":0},{"id":"normalmodes5","ω1":5,"ω2":3,"ωJ":4,"m1":10,"m2":15,"A1":1,"A2":0},{"id":"normalmodes6","ω1":5,"ω2":3,"ωJ":4,"m1":10,"m2":15,"A1":1,"A2":0},{"id":"normalmodes7","ω1":5,"ω2":3,"ωJ":4,"m1":10,"m2":15,"A1":1,"A2":0},{"id":"normalmodes8","ω1":5,"ω2":3,"ωJ":7,"m1":10,"m2":10,"A1":0.66,"A2":1,"show":["grCircularU1","grCircularU2","grSpringU1","grSpringU2"]},{"id":"outro","ω1":5,"ω2":3,"ωJ":7,"m1":10,"m2":10,"A1":0.66,"A2":1,"show":["grText","grSpring1","grSpringJ","grSpring2","grControl1","grControlJ","grControl2","grCircular1","grCircular2","grJGraph","grCircularU1","grCircularU2","grSpringU1","grSpringU2"]},{"id":"end","A1":0,"A2":0,"show":["grText","grSpring1","grSpringJ","grSpring2","grControl1","grControlJ","grControl2","grCircular1","grCircular2","grJGraph","grCircularU1","grCircularU2","grSpringU1","grSpringU2"]}];

  const get_ωU2 = function (ω1, ω2, ωJ, η) {
    if (ωJ === 0) {
      return ω2;
    }
    const Δ2 = ω1*ω1 - ω2*ω2;
    const z = ωJ*ωJ;
    const s = ω1 >= ω2 ? +1 : -1;
    return Math.sqrt(0.5 * (ω1*ω1 + ω2*ω2 + z - s*Math.sqrt(Δ2*Δ2 - 2*η*Δ2*z + z*z)));
  };

  const get_ωU1 = function (ω1, ω2, ωJ, η) {
    if (ωJ === 0) {
      return ω1;
    }
    const Δ2 = ω1*ω1 - ω2*ω2;
    const z = ωJ*ωJ;
    const s = ω1 >= ω2 ? +1 : -1;
    return Math.sqrt(0.5 * (ω1*ω1 + ω2*ω2 + z + s*Math.sqrt(Δ2*Δ2 - 2*η*Δ2*z + z*z)));
  };

  const get_r1 = function (ω1, ω2, ωJ, η) { // defined as: u1 = [1, r1]
    if (ωJ === 0) {
      return 0;
    }
    const Δ2 = ω1*ω1 - ω2*ω2;
    const z = ωJ*ωJ;
    const s = ω1 >= ω2 ? +1 : -1;
    return (Δ2 - η*z - s*Math.sqrt(Δ2*Δ2 - 2*η*Δ2*z + z*z)) / ((1-η) * z)
  };

  const get_r2 = function (ω1, ω2, ωJ, η) { // defined as: u2 = [r2, 1]
    if (ωJ === 0) {
      return 0;
    }
    const Δ2 = ω1*ω1 - ω2*ω2;
    const z = ωJ*ωJ;
    const s = ω1 >= ω2 ? +1 : -1;
    return (-Δ2 + η*z + s*Math.sqrt(Δ2*Δ2 - 2*η*Δ2*z + z*z)) / ((1+η) * z)
  };

  const clampInf = function (x) {
    return isFinite(x)?x:100;
  };

  that.init = function () {
    // I'm trying to be clever here by not doing a DOM call in the animation loop,
    // Rather defining all these consts here in the closure.
    // Does mean rather a lot of defs though. There's lots of moving parts!
    const s1Width = el("spring1").getBBox().width;
    const s1X = el("spring1").getBBox().x;
    const s1Trans = el("spring1").getAttribute("transform") || "";
    const sJWidth = el("springJ").getBBox().width;
    const sJX = el("springJ").getBBox().x;
    const sJTrans = el("springJ").getAttribute("transform") || "";
    const s2Width = el("spring2").getBBox().width;
    const s2X = el("spring2").getBBox().x;
    const s2Trans = el("spring2").getAttribute("transform") || "";
    const m1Trans = el("mass1").getAttribute("transform") || "";
    const m2Trans = el("mass2").getAttribute("transform") || "";

    const sU1Width = el("springU1").getBBox().width;
    const sU1X = el("springU1").getBBox().x;
    const sU1Trans = el("springU1").getAttribute("transform") || "";
    const sU2Width = el("springU2").getBBox().width;
    const sU2X = el("springU2").getBBox().x;
    const sU2Trans = el("springU2").getAttribute("transform") || "";
    const mU1Trans = el("massU1").getAttribute("transform") || "";
    const mU2Trans = el("massU2").getAttribute("transform") || "";

    const ph1Trans = el("phase1").getAttribute("transform") || "";
    const ph2Trans = el("phase2").getAttribute("transform") || "";
    const phU1Trans = el("phaseU1").getAttribute("transform") || "";
    const phU2Trans = el("phaseU2").getAttribute("transform") || "";

    const marker1Trans = el("marker1").getAttribute("transform") || "";
    const l1Trans = el("label1").getAttribute("transform") || "";
    const marker2Trans = el("marker2").getAttribute("transform") || "";
    const l2Trans = el("label2").getAttribute("transform") || "";
    const markerU1Trans = el("markerU1").getAttribute("transform") || "";
    const lU1Trans = el("labelU1").getAttribute("transform") || "";
    const markerU2Trans = el("markerU2").getAttribute("transform") || "";
    const lU2Trans = el("labelU2").getAttribute("transform") || "";
    const assymTrans = el("assymptoteM").getAttribute("transform") || "";
    const labelTrans = el("labelM").getAttribute("transform") || "";

    const scale = s1Width / 3;
    const phScale = +el("circU1").getAttribute("r");
    const ωScale = el("axisω").getBBox().height / 20;
    const ωJScale = el("axisωJ").getBBox().width / 20;

    that.changeState = function () {
      const ω1 = +el("ω1").value || 1/100,
        ω2 = +el("ω2").value || 1/100,
        ωJ = +el("ωJ").value,
        m1 = +el("m1").value,
        m2 = +el("m2").value,
        η = (m1-m2)/(m1+m2),
        ωU1 = get_ωU1(ω1, ω2, ωJ, η),
        ωU2 = get_ωU2(ω1, ω2, ωJ, η),
        r1 = get_r1(ω1, ω2, ωJ, η),
        r2 = get_r2(ω1, ω2, ωJ, η);
      let A1 = cParams["A1"],
        A2 = cParams["A2"];
      let φ1, φ2;
      const ωM = Math.sqrt(((1 + η) * ω1*ω1 + (1 - η) * ω2*ω2)/2);
      let i, ωi, strC1, strC2;
      if (
        ((ω1 >= ω2) !== (cParams["ω1"] >= cParams["ω2"])) && // This top line is legit
        !(ω1 !== cParams["ω1"] && ω2 !== cParams["ω2"]) // This one is a hack, to make the swap only if one frequency is changed.
      ) {
        A1 = ((ω1 >= ω2)?-1:+1)*cParams["A2"];
        A2 = ((ω1 >= ω2)?+1:-1)*cParams["A1"];
        φ1 = (+cParams["φ2"] || 0) + ((+dParams["ωU2"] || 0) - ωU1) * t;
        φ2 = (+cParams["φ1"] || 0) + ((+dParams["ωU1"] || 0) - ωU2) * t;
      } else {
        φ1 = (+cParams["φ1"] || 0) + ((+dParams["ωU1"] || 0) - ωU1) * t;
        φ2 = (+cParams["φ2"] || 0) + ((+dParams["ωU2"] || 0) - ωU2) * t;
      }
      cParams = {
        "ω1" : ω1,
        "ω2" : ω2,
        "ωJ" : ωJ,
        "η"  : η,
        "A1" : A1,
        "A2" : A2,
        "φ1" : φ1,
        "φ2" : φ2
      }
      dParams = {
        "ωU1" : ωU1,
        "ωU2" : ωU2,
        "r1"  : r1,
        "r2"  : r2
      };

      el("spring1").style.strokeWidth = ω1 / 2;
      el("springJ").style.strokeWidth = ωJ / 2;
      el("spring2").style.strokeWidth = ω2 / 2;
      el("springU1").style.strokeWidth = ωU1 / 2;
      el("springU2").style.strokeWidth = ωU2 / 2;

      el("mass1").setAttribute("r", 50*(1+η)/2)
      el("mass2").setAttribute("r", 50*(1-η)/2)

      el("circU1").setAttribute("r", phScale * Math.abs(A1));
      el("circU2").setAttribute("r", phScale * Math.abs(A2));

      el("circ1p").setAttribute("rx", phScale *
      Math.abs(
        A1 + r2 * A2
      ));
      el("circ1p").setAttribute("ry", phScale *
      clampInf(Math.abs(
        (ωU1 * A1 + r2 * ωU2 * A2) / ω1
      )));

      el("circ1m").setAttribute("rx", phScale *
      Math.abs(
        A1 - r2 * A2
      ));
      el("circ1m").setAttribute("ry", phScale *
      clampInf(Math.abs(
        (ωU1 * A1 - r2 * ωU2 * A2) / ω1
      )));


      el("circ2p").setAttribute("rx", phScale *
      Math.abs(
        A1 * r1 + A2
      ));
      el("circ2p").setAttribute("ry", phScale *
      clampInf(Math.abs(
        (ωU1 * A1 * r1 + ωU2 * A2) / ω2
      )));

      el("circ2m").setAttribute("rx", phScale *
      Math.abs(
        A1 * r1 - A2
      ));
      el("circ2m").setAttribute("ry", phScale *
      clampInf(Math.abs(
        (ωU1 * A1 * r1 - ωU2 * A2) / ω2
      )));

      el("marker1").setAttribute("transform",
        "translate( 0," + (200 - ωScale*ω1) + ") " +
        marker1Trans);
      el("label1").setAttribute("transform",
        "translate( 0," + (200 - ωScale*ω1) + ") " +
        l1Trans);
      el("marker2").setAttribute("transform",
        "translate( 0," + (100 - ωScale*ω2) + ") " +
        marker2Trans);
      el("label2").setAttribute("transform",
        "translate( 0," + (100 - ωScale*ω2) + ") " +
        l2Trans);
      el("markerU1").setAttribute("transform",
        "translate( " + (-165 + ωJScale * ωJ) + "," + (200 - ωScale*ωU1) + ") " +
        markerU1Trans);
      el("labelU1").setAttribute("transform",
        "translate( " + (-165 + ωJScale * ωJ) + "," + (200 - ωScale*ωU1) + ") " +
        lU1Trans);
      el("markerU2").setAttribute("transform",
        "translate( " + (-165 + ωJScale * ωJ) + "," + (100 - ωScale*ωU2) + ") " +
        markerU2Trans);
      el("labelU2").setAttribute("transform",
        "translate( " + (-165 + ωJScale * ωJ) + "," + (100 - ωScale*ωU2) + ") " +
        lU2Trans);

      el("assymptoteM").setAttribute("transform",
        "translate(0, " + (165 - ωM * ωScale) + ") " +
        assymTrans);
      el("labelM").setAttribute("transform",
        "translate(0, " + (165 - ωM * ωScale) + ") " +
        labelTrans);

      strC1 = "m 300 " + (562 - ω1 * ωScale);
      strC2 = "m 300 " + (562 - ω2 * ωScale);
      for (i = 0; i < 101; i+=1) {
        ωi = 20 * i / 100;
        strC1 += " L " + (300 + ωi * ωScale) + " " +
          (562 - get_ωU1(ω1, ω2, ωi, η) * ωScale)
        strC2 += " L " + (300 + ωi * ωScale) + " " +
          (562 - get_ωU2(ω1, ω2, ωi, η) * ωScale)
      }
      el("curve1").setAttribute("d", strC1)
      el("curve2").setAttribute("d", strC2)

      el("A1").value = cParams["A1"].toPrecision(3);
      el("A2").value = cParams["A2"].toPrecision(3);
      el("φ1").value = ((cParams["φ1"] % (2* Math.PI) + 2 * Math.PI) % (2* Math.PI)).toPrecision(3);
      el("φ2").value = ((cParams["φ2"] % (2* Math.PI) + 2 * Math.PI) % (2* Math.PI)).toPrecision(3);
      el("k1").value = (cParams["ω1"]*cParams["ω1"]*m1).toPrecision(3);
      el("k2").value = (cParams["ω2"]*cParams["ω2"]*m2).toPrecision(3);

      el("ωu1").value = dParams["ωU1"].toPrecision(3);
      el("ωu2").value = dParams["ωU2"].toPrecision(3);
      el("r1").value = dParams["r1"].toPrecision(3);
      el("r2").value = dParams["r2"].toPrecision(3);
      el("j").value = (cParams["ωJ"]*cParams["ωJ"]*m1*m2/(m1+m2)).toPrecision(3);
      el("η").value = cParams["η"].toPrecision(3);
    };

    that.draw = function () {
      const x1 = that.x1, x2 = that.x2, u1 = that.u1, u2 = that.u2,
      v1 = that.v1, v2 = that.v2, w1 = that.w1, w2 = that.w2;
      el("mass1").setAttribute("transform",
        "translate(" + scale * x1 + ") " +
        m1Trans);
      el("mass2").setAttribute("transform",
        "translate(" + scale * x2 + ") " +
        m2Trans);
      el("spring1").setAttribute("transform",
        "translate(" + s1X + ") " +
        "scale(" + (s1Width + scale * x1)/s1Width + ", 1) " +
        "translate(" + -s1X + ") " +
        s1Trans);
      el("springJ").setAttribute("transform",
        "translate(" + scale * x1 + ") " +
        "translate(" + sJX + ") " +
        "scale(" + (sJWidth - scale * (x1-x2))/sJWidth + ", 1) " +
        "translate(" + -sJX + ") " +
        sJTrans);
      el("spring2").setAttribute("transform",
        "translate(" + (s2X + s2Width) + ") " +
        "scale(" + (s2Width - scale * x2)/s2Width + ", 1) " +
        "translate(" + -(s2X + s2Width) + ") " +
        s2Trans);

      el("massU1").setAttribute("transform",
        "translate(" + scale * u1 + ") " +
        mU1Trans);
      el("massU2").setAttribute("transform",
        "translate(" + scale * u2 + ") " +
        mU2Trans);
      el("springU1").setAttribute("transform",
        "translate(" + sU1X + ") " +
        "scale(" + (sU1Width + scale * u1)/sU1Width + ", 1) " +
        "translate(" + -sU1X + ") " +
        sU1Trans);
      el("springU2").setAttribute("transform",
        "translate(" + (sU2X + sU2Width) + ") " +
        "scale(" + (sU2Width - scale * u2)/sU2Width + ", 1) " +
        "translate(" + -(sU2X + sU2Width) + ") " +
        sU2Trans);

      el("phase1").setAttribute("transform",
        "translate(" + phScale * x1 + ", " + -phScale * clampInf(v1) + ") " +
        ph1Trans);
      el("phase2").setAttribute("transform",
        "translate(" + phScale * x2 + ", " + -phScale * clampInf(v2) + ") " +
        ph2Trans);
      el("phaseU1").setAttribute("transform",
        "translate(" + phScale * u1 + ", " + -phScale * w1 + ") " +
        phU1Trans);
      el("phaseU2").setAttribute("transform",
        "translate(" + phScale * u2 + ", " + -phScale * w2 + ") " +
        phU2Trans);
    }

    // Drag and Drop Section.
    let dragId = null, X0=[0,0], δX=[0,0],
      δXp1=[0,0], δXp2=[0,0], δXp3=[0,0],
      downState;

      ["mass1", "mass2", "massU1", "massU2",
        "marker1", "marker2", "markerU1", "markerU2",
        "phase1", "phase2", "phaseU1", "phaseU2"
      ].map(function(id) {
      el(id).onmousedown = function (e) {
        dragId = id;
        downState = {"x1": that.x1, "x2": that.x2, "u1": that.u1, "u2": that.u2,
          "v1": that.v1, "v2": that.v2, "w1": that.w1, "w2": that.w2,
          "ω1": cParams["ω1"], "ω2": cParams["ω2"], "ωJ": cParams["ωJ"]}
        X0 = [e.screenX, e.screenY];
        δX = [0, 0];
        el(id).style.cursor="grabbing";
        el("root").style.cursor="grabbing";
      };
//       el(id].ontouchstart = function (e) {
//         dragId = id;
//         downState = {"x1": that.x1, "x2": that.x2, "u1": that.u1, "u2": that.u2,
//           "v1": that.v1, "v2": that.v2, "w1": that.w1, "w2": that.w2,
//           "ω1": cParams["ω1"], "ω2": cParams["ω2"], "ωJ": cParams["ωJ"]}
//         X0 = [e.touch[0].screenX, e.touch[0].screenY];
//         δX = [0, 0];
//       };
      el(id).style.cursor="grab";
    })

    el("root").onmouseup = el("root").onmousemove = function (e) {
      if (+e.buttons !== 1) {
        dragId && (el(dragId).style.cursor = "grab");
        el("root").style.cursor = "";
        dragId = null;
        return e.preventDefault();
      }
      δX = [e.screenX - X0[0], e.screenY - X0[1]]
      return e.preventDefault();
    };
//     el("root").ontouchend = function (e) {
//       el("root").style.cursor = "";
//       dragId = null;
//       return e.preventDefault();
//     };
//     el("root").ontouchmove = function (e) {
//       δX = [e.touch[0].screenX - X0[0], e.touch[0].screenY - X0[1]]
//       return e.preventDefault();
//     };
    document.childNodes[1] &&
      (document.childNodes[1].onmousemove = (e) => e.preventDefault());
    document.childNodes[1] &&
      (document.childNodes[1].ondragstart = (e) => e.preventDefault());
    el("root").ondragstart = (e) => e.preventDefault();

    let dt;
    let dtp1=dt
    let dtp2=dt;
    let lastFrame = +new Date;
    const nextFrame = function (now) {
      dtp2 = dtp1;
      dtp1 = dt;
      dt = (now - lastFrame)/1000;
      const dT = dt + dtp1 + dtp2 || 3*dt;
      if (!that.paused) {
        t += dt;
      }
      lastFrame = now;

      that.u1 = cParams["A1"] * Math.cos(dParams["ωU1"] * t + cParams["φ1"]);
      that.w1 = -cParams["A1"] * Math.sin(dParams["ωU1"] * t + cParams["φ1"]);

      that.u2 = cParams["A2"] * Math.cos(dParams["ωU2"] * t + cParams["φ2"]);
      that.w2 = -cParams["A2"] * Math.sin(dParams["ωU2"] * t + cParams["φ2"]);

      that.x1 = that.u1 + dParams["r2"] * that.u2;
      that.v1 = (dParams["ωU1"] * that.w1 +
        dParams["r2"] * dParams["ωU2"] * that.w2) / cParams["ω1"];

      that.x2 = dParams["r1"] * that.u1 + that.u2;
      that.v2 = (dParams["ωU1"] * dParams["r1"] * that.w1 +
        dParams["ωU2"] * that.w2) / cParams["ω2"];

      δXp3 = δXp3 || 0
      δXp2 = δXp2 || 0

      if (dragId === "mass1") {
        that.x1 = downState["x1"] + δX[0] / scale;
        that.v1 = (δX[0]-δXp3[0]) / dT / scale / cParams["ω1"];
      } else if (dragId === "mass2") {
        that.x2 = downState["x2"] + δX[0] / scale;
        that.v2 = (δX[0]-δXp3[0]) / dT / scale / cParams["ω2"];
      } else if (dragId === "massU1") {
        that.u1 = downState["u1"] + δX[0] / scale;
        that.w1 = (δX[0]-δXp3[0]) / dT / scale / dParams["ωU1"];
      } else if (dragId === "massU2") {
        that.u2 = downState["u2"] + δX[0] / scale;
        that.w2 = (δX[0]-δXp3[0]) / dT / scale / dParams["ωU2"];
      } else if (dragId === "phase1") {
        that.x1 = downState["x1"] + δX[0] / phScale;
        that.v1 = downState["v1"] - δX[1] / phScale
      } else if (dragId === "phase2") {
        that.x2 = downState["x2"] + δX[0] / phScale;
        that.v2 = downState["v2"] - δX[1] / phScale
      } else if (dragId === "phaseU1") {
        that.u1 = downState["u1"] + δX[0] / phScale;
        that.w1 = downState["w1"] - δX[1] / phScale
      } else if (dragId === "phaseU2") {
        that.u2 = downState["u2"] + δX[0] / phScale;
        that.w2 = downState["w2"] - δX[1] / phScale
      } else if (dragId === "marker1") {
        el("ω1").value = Math.max(0,Math.min(20,downState["ω1"] - δX[1] / ωScale)).toFixed(1);
      } else if (dragId === "marker2") {
        el("ω2").value = Math.max(0,Math.min(20,downState["ω2"] - δX[1] / ωScale)).toFixed(1);
      } else if (dragId === "markerU1" || dragId === "markerU2") {
        el("ωJ").value = Math.max(0,Math.min(20,downState["ωJ"] + δX[0] / ωScale)).toFixed(1);
      }

      if (dragId === "mass1" || dragId === "mass2" || dragId === "phase1" || dragId === "phase2") {
        cParams["A1"] = Math.hypot(
          that.v1 * cParams["ω1"] - dParams["r2"] * that.v2 * cParams["ω2"],
          (that.x1 - dParams["r2"] * that.x2) * dParams["ωU1"]) /
          dParams["ωU1"] / Math.abs(dParams["r2"]*dParams["r1"]-1);
        cParams["A2"] = Math.hypot(
          dParams["r1"] * that.v1 * cParams["ω1"] - that.v2 * cParams["ω2"],
          (that.x2 - dParams["r1"] * that.x1) * dParams["ωU2"]) /
          dParams["ωU2"] / Math.abs(dParams["r2"]*dParams["r1"]-1);
          cParams["φ1"] = -t * dParams["ωU1"] + Math.atan2(
            (-1+dParams["r2"]*dParams["r1"]) *
            (that.v1 * cParams["ω1"] - dParams["r2"] * that.v2 * cParams["ω2"]),
            (-1+dParams["r2"]*dParams["r1"]) *
            (-that.x1 + dParams["r2"] * that.x2) * dParams["ωU1"]
          )
          cParams["φ2"] = -t * dParams["ωU2"] + Math.atan2(
            -(-1+dParams["r2"]*dParams["r1"]) *
            (dParams["r1"] * that.v1 * cParams["ω1"] - that.v2 * cParams["ω2"]),
            (-1+dParams["r2"]*dParams["r1"]) *
            (dParams["r1"] * that.x1 - that.x2) * dParams["ωU2"]
          );
      }
      if (dragId === "massU1" || dragId === "phaseU1") {
        cParams["A1"] = Math.sqrt(that.u1*that.u1 + that.w1*that.w1);
        cParams["φ1"] = -t * dParams["ωU1"] + Math.atan2(-that.w1, that.u1);
      }
      if (dragId === "massU2" || dragId === "phaseU2") {
        cParams["A2"] = Math.sqrt(that.u2*that.u2 + that.w2*that.w2);
        cParams["φ2"] = -t * dParams["ωU2"] + Math.atan2(-that.w2, that.u2);
      }
      δXp3 = δXp2
      δXp2 = δXp1
      δXp1 = δX

      if (dragId !== null) {
        that.changeState();
      }
      that.draw();
      requestAnimationFrame(nextFrame);
    };
    requestAnimationFrame(nextFrame);


    ["ω1","ω2","ωJ","m1","m2"].map(function (e) {
      el(e).oninput = that.changeState;
    });

    that.reset = function (page) {
      t=0;
      if (+page !== page) {
        page = that.page;
      }
      that.page = Math.min(Math.max(page || 0, 0), that.pages.length - 1);
      el("pagei").textContent = that.page + 1;

      const cPage = that.pages[page];

      cParams["A1"] = cPage && cPage["A1"] || 0;
      cParams["A2"] = cPage["A2"] || 0;
      cParams["φ1"] = cPage["φ1"] || 0;
      cParams["φ2"] = cPage["φ2"] || 0;
      if (cPage["ω1"] === +cPage["ω1"]) { el("ω1").value = cPage["ω1"] }
      if (cPage["ω2"] === +cPage["ω2"]) { el("ω2").value = cPage["ω2"] }
      if (cPage["ωJ"] === +cPage["ωJ"]) { el("ωJ").value = cPage["ωJ"] }
      if (cPage["m1"] === +cPage["m1"]) { el("m1").value = cPage["m1"] }
      if (cPage["m2"] === +cPage["m2"]) { el("m2").value = cPage["m2"] }

      that.pages.map(function (p) {
        if (p["id"] === cPage["id"]) {
          document.getElementById(p["id"]).style.display = "";
        } else {
          document.getElementById(p["id"]).style.display = "none";
        }
      });

      cPage["show"] && cPage["show"].map(function (gr) {
        el(gr).style.display = "";
      });

      if (!that.pro) {
        cPage["hide"] && cPage["hide"].map(function (gr) {
          el(gr).style.display = "none";
        });
      }

      that.changeState();
      return false;
    }

    el("reset").onclick = that.reset;

    el("pause").onclick = function () {
      that.paused = (!that.paused) || false;
      if (that.paused) {
        el("root").setAttribute("filter", "url(#pauseFilter)");
        el("pause").textContent = "Resume"
      } else {
        el("root").setAttribute("filter", "");
        el("pause").textContent = "Pause"
      }
    }

    el("pagen").textContent = that.pages.length;

    el("first").onclick = function () {
      return that.reset(0);
    }
    that.next = el("next").onclick = function () {
      return that.reset(that.page + 1);
    }
    el("prev").onclick = function () {
      return that.reset(that.page - 1);
    }
    el("last").onclick = that.last = function () {
      return that.reset(that.pages.length - 2);
    };

    that.proMode = function () {
      that.pro = true;
      [
      "grText","grSpring1","grSpringJ","grSpring2",
      "grControl1","grControlJ","grControl2","grCircular1","grCircular2",
      "grJGraph","grCircularU1","grCircularU2","grSpringU1","grSpringU2"
      ].map(function (gr) {
        el(gr).style.display = "";
      });
      that.reset(0);
      return false;
    };

    that.reset(0);
    //el("scrollbox").style.overflowY = "auto"; // This causes mathml bugs. not strictly nec.

    //that.last();

  };

  return that;
})();
