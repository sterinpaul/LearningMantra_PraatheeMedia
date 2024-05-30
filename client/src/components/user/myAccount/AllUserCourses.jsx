import { useEffect, useState } from "react";
import { SingleUserCourse } from "./SingleUserCourse";
import { getUserCourseDetails,removeCourse } from "../../../api/apiConnections/userConnections";
import {
    Typography
} from "@material-tailwind/react";
import { toast } from "react-toastify";

export const AllUserCourses = ()=>{
    const [userCourses,setUserCourses] = useState([])

    const getCourses = async()=>{
        const userCourses = await getUserCourseDetails()
        if(userCourses?.status){
            setUserCourses(userCourses.data)
        }
    }

    useEffect(()=>{
        getCourses()
    },[])

    const removeCourseFromUser = async(courseId)=>{
        const response = await removeCourse(courseId)
        if(response?.status){
            toast.success(response.message)
            setUserCourses(previous=>previous.filter(single=>single._id !== courseId))
        }
    }

    return(
        <div className="w-full h-full pt-20 pb-8 ">
            
            <Typography variant="h4" color="blue-gray" className="mb-2 text-center">
                My Courses
            </Typography>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 place-items-center">
            {userCourses.length ? userCourses?.map((course)=>(
                <SingleUserCourse key={course._id} course={course} removeCourseFromUser={removeCourseFromUser} />
            )) : <p>You have no courses</p>}
            </div>
        </div>
    )
}