import { useState, useEffect }from "react";
import { ArrowUp } from "lucide-react";


export default function BackToTop(){
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {

        //If vertical scroll past 400px => show the button
        const toggleVisibility = () => {
            if(window.scrollY > 400 ){
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };
        window.addEventListener("scroll", toggleVisibility);

        //Remove event listener when the component unmounts for performance reasons
        return () => window.removeEventListener("scroll", toggleVisibility);
    }, []);

    //function to scroll to the top of the page
    const scrollToTop = () => {
        window.scrollTo({
          top: 0,
          behavior: 'smooth',
        });
      };

      if(!isVisible) return null;
      return (
        <button
          onClick={scrollToTop}
          className="fixed bottom-20 right-8 bg-blue-500 text-white px-4 py-4 rounded-full shadow-lg hover:bg-blue-600 transition-colors z-50  " 
        >
          <ArrowUp className="w-6 h-6" />
        </button>
      );
    
}