import { useRef, useEffect } from "react";
import * as React from "react";
import { throttle } from "lodash";
import "./InteractiveEmoji.css";

export function InteractiveEmoji() {
  const svg = useRef<SVGSVGElement>((null as any) as SVGSVGElement);

  useEffect(() => {
    document.body.classList.add("fly");
    return () => document.body.classList.remove("fly");
  }, []);
  useEffect(() => {
    const cb = throttle((event: MouseEvent): void => {
      const curr = svg.current;
      if (curr) {
        const leftEye = curr.querySelector("#left-eye") as SVGCircleElement;
        const rightEye = curr.querySelector("#right-eye") as SVGCircleElement;
        const leftPupil = curr.querySelector("#left-pupil") as SVGCircleElement;
        const rightPupil = curr.querySelector(
          "#right-pupil"
        ) as SVGCircleElement;

        const leftPosition = getOffset(leftEye, event);
        leftPupil.setAttribute("cx", leftPosition.x.toString());
        leftPupil.setAttribute("cy", leftPosition.y.toString());

        const rightPosition = getOffset(rightEye, event);
        rightPupil.setAttribute("cx", rightPosition.x.toString());
        rightPupil.setAttribute("cy", rightPosition.y.toString());
      }
    }, 50);
    document.addEventListener("mousemove", cb);
    return () => document.removeEventListener("mousemove", cb);
  }, []);
  return (
    <div style={{ width: "100%", maxWidth: "400px" }}>
      <OpenMojiRollingEyes svgRef={svg} />
    </div>
  );
}

function getOffset(
  el: SVGCircleElement,
  cursor: MouseEvent
): { x: number; y: number } {
  const rect = el.getBoundingClientRect();
  const r = rect.width / 2;
  // center of circle
  const cx = rect.x + r;
  const cy = rect.y + r;
  // screen distance from center to cursor
  const mx = cursor.clientX - cx;
  const my = cursor.clientY - cy;
  const mr = Math.sqrt(Math.pow(mx, 2) + Math.pow(my, 2));
  // keep the pupil in the eye
  const maxOffset = r * 0.7;
  const constrain = mr > maxOffset ? maxOffset / mr : 1;
  // pupil screen offset from center of eye
  const px = mx * constrain;
  const py = my * constrain;
  // translate back to svg units
  const ratio = el.r.baseVal.value / r;
  const sx = px * ratio + Number.parseFloat(el.getAttribute("cx") || "0");
  const sy = py * ratio + Number.parseFloat(el.getAttribute("cy") || "0");

  return { x: sx, y: sy };
}

function OpenMojiRollingEyes({
  svgRef,
}: {
  svgRef?: React.Ref<SVGSVGElement>;
}) {
  // https://openmoji.org/library/
  return (
    <svg
      ref={svgRef}
      id="emoji"
      viewBox="0 0 72 72"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g id="color">
        <circle className="highlight-1" cx="34" cy="32" r="23" />
        <circle className="highlight-2" cx="39" cy="38" r="23" />
        <circle className="highlight-3" cx="33" cy="40" r="23" />
        <circle className="iris" cx="46" cy="32" r="6.5" />
        <circle className="iris" cx="26" cy="32" r="6.5" />
      </g>
      <g id="hair" />
      <g id="skin" />
      <g id="skin-shadow" />
      <g id="line">
        {/* left */}
        <circle
          id="left-pupil"
          cx="42.0556"
          cy="32"
          r="2.5556"
          fill="#222222"
        />
        <circle
          id="right-pupil"
          cx="22.0556"
          cy="32"
          r="2.5556"
          fill="#222222"
        />
        <circle
          id="head"
          cx="36"
          cy="36"
          r="23"
          fill="none"
          className="line"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeMiterlimit="10"
          strokeWidth="2"
        />
        <circle
          id="right-eye"
          cx="46"
          cy="32"
          r="6.5"
          fill="none"
          className="line"
          strokeMiterlimit="10"
          strokeWidth="2"
        />
        <circle
          id="left-eye"
          cx="26"
          cy="32"
          r="6.5"
          fill="none"
          className="line"
          strokeMiterlimit="10"
          strokeWidth="2"
        />
        <line
          x1="31"
          x2="41"
          y1="49.4967"
          y2="49.4967"
          fill="none"
          className="line"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeMiterlimit="10"
          strokeWidth="2"
        />
      </g>
    </svg>
  );
}
