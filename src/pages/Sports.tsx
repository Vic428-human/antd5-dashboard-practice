import SidebarWrapper from "../components/SidebarWrapper";

export default function Sports() {
  return (
    <SidebarWrapper isOpen={true}>
      <div className="h-8 bg-[#212121] px-4 text-white flex justify-between items-center text-[14px] font-semibold overflow-y-auto">
        <span>全部展開區域</span>
      </div>
    </SidebarWrapper>
  );
}
