/** Abstract Baltimore rowhouse & skyline line art. */
export function Skyline({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 1200 120" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden className={className}>
      <path d="M0 119h1200" />
      <path d="M20 119V70h60v49M80 119V62h60v57M140 119V70h60v49M200 119V62h60v57" />
      <path d="M30 80h10v12H30zM60 80h10v12H60zM90 74h10v12H90zM120 74h10v12h-10zM150 80h10v12h-10zM180 80h10v12h-10zM210 74h10v12h-10zM240 74h10v12h-10z" />
      <path d="M300 119V40h40v79M320 40V22M360 119V55h50v64M430 119V10l20-10 20 10v109M490 119V48h45v71M555 119V30h35v89" />
      <path d="M610 119V60c0-30 60-30 60 0v59M640 30v-10" />
      <path d="M690 119V45h40v74M750 119V25h30v94M765 25V8M800 119V58h55v61M870 119V38h40v81" />
      <path d="M930 119V70h60v49M990 119V62h60v57M1050 119V70h60v49M1110 119V62h70v57" />
      <path d="M940 80h10v12h-10zM970 80h10v12h-10zM1000 74h10v12h-10zM1030 74h10v12h-10zM1060 80h10v12h-10zM1090 80h10v12h-10zM1125 74h10v12h-10zM1155 74h10v12h-10z" />
    </svg>
  );
}
