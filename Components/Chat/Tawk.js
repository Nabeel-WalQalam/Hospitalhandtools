import { useEffect } from "react";

const TawkTo = () => {
  useEffect(() => {
    const tawkToScript = document.createElement("script");
    tawkToScript.innerHTML = `
    
    var Tawk_API=Tawk_API||{}, Tawk_LoadStart=new Date();
    (function(){
    var s1=document.createElement("script"),s0=document.getElementsByTagName("script")[0];
    s1.async=true;
    s1.src='https://embed.tawk.to/6469c9f8ad80445890ee2c41/1h0ujptf3';
    s1.charset='UTF-8';
    s1.setAttribute('crossorigin','*');
    s0.parentNode.insertBefore(s1,s0);
    })();
    
    `;
    document.body.appendChild(tawkToScript);

    return () => {
      document.body.removeChild(tawkToScript);
    };
  }, []);

  return null;
};

export default TawkTo;

// <!--Start of Tawk.to Script-->

// <!--End of Tawk.to Script-->
