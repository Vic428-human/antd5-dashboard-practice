import { useEffect, forwardRef } from "react";
import type { LuckySportsInstance } from "https://widget-dev-v3.ckex.xyz/mock/LuckySports.es.js";
// /https://widget-dev-v3/mock/LuckySports.es.js

const LuckySports = forwardRef((props, ref: any) => {
  useEffect(() => {
    (async () => {
      const LuckySports = (
        await import("https://widget-dev-v3.ckex.xyz/mock/LuckySports.es.js")
      ).default as { new (): LuckySportsInstance };

      if (ref?.current) return;

      // Replace your customized LuckySports init
      ref.current = new LuckySports().init({
        target: document.getElementById("sport-root"),
        token:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNGRhMWU5ZDgtMWUxZS00NGMzLTkxNmMtNTgxOGQyYmU0YmRhIiwicGxheWVyX2lkIjoiY2tleF90ZXN0X3BsYXllcjEiLCJtZXJjaGFudF9jb2RlIjoiYmFja29mZmljZS1kOWUzMiIsImlzc3VlZF9hdCI6IjIwMjMtMDItMTBUMDg6NTc6MjkuOTExNzA3NDE1WiIsImV4cGlyZXNfYXQiOiIyMDMwLTAyLTEwVDAwOjAwOjAwLjAwMDAwMDYzNFoiLCJsYW5ndWFnZSI6ImVuIn0.1HzNrrIGrETdgTpANw6IAh2ZNvpr4sG0-n7jnPIIlnw",
        // theme: { {/** theme settings */} },
        options: { displayHeader: false },
        // onLogin: () => {{/** login callback */}},
      });
    })();

    // cleanup function
    return () => {
      if (ref?.current) return;
      ref.current?.kill();
    };
  }, []);

  return (
    <div>
      <link
        rel="stylesheet"
        href="https://widget-dev-v3.ckex.xyz/mock/style.css"
        crossOrigin="anonymous"
      />
      <div id="sport-root"></div>
    </div>
  );
});

export default LuckySports;
