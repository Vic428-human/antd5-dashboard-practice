// https://ant.design/docs/spec/layout
// Layout => https://ant.design/components/layout
import { Layout } from "antd";
import MainContent from "./routes/MainContent.tsx";

const { Content } = Layout;

function App() {
  return (
    <Layout className="h-screen w-screen" style={{ margin: "" }}>
      <Layout>
        <>
          <div
            className="relative w-full px-24 py-0.5 bg-yellow-600  shadow-md
 outline-offset-[-1px] "
          >
            {/* 中間文字置中 */}
            <div className="flex justify-center items-center">
              <div className="text-center text-secondary-950 text-base font-medium font-['Roboto'] leading-normal tracking-tight">
                SETTINGS
              </div>
            </div>
            {/* Reset 按鈕定位在右上角 */}
            <div className="w-44 h-6 py-1 absolute top-[2px] right-0 bg-yellow-500 rounded-md flex justify-center items-center gap-1 overflow-hidden">
              <div className="flex-1 py-0.5 flex flex-col justify-center items-center">
                <div className="text-center text-secondary-950 text-base font-medium font-['Roboto'] leading-none">
                  Reset
                </div>
              </div>
            </div>
          </div>
        </>
        <Content className="bg-content-container" style={{ margin: "" }}>
          <div>
            {/* 不同路由會在這裡切換 */}
            <MainContent />
          </div>
        </Content>
      </Layout>
    </Layout>
  );
}

export default App;
