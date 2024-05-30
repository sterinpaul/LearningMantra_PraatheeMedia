import { AllCourses } from "../../components/user/home/AllCourses"
import { IntroSection } from "../../components/user/home/IntroSection"
import { NavBar } from "../../components/user/NavBar"


const Home = ()=>{
    return(
        <>
            <NavBar/>
            <IntroSection/>
            <AllCourses/>
        </>
    )
}

export default Home