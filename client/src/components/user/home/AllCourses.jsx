import { useEffect, useState } from "react";
import { SingleCourse } from "./SingleCourse";
import { getAllCourses,getUserCourses,changeCourseStatus } from "../../../api/apiConnections/userConnections";
import {
    Typography
} from "@material-tailwind/react";
import { toast } from "react-toastify";

export const AllCourses = ()=>{
    const [allCourses,setAllCourses] = useState([])
    const [userCourses,setUserCourses] = useState([])

    const getCourses = async()=>{
        const [allCourse,userCourse] = await Promise.all([
            getAllCourses(),
            getUserCourses()
        ])
        if(allCourse?.status){
            setAllCourses(allCourse.data)
        }
        if(userCourse?.status){
            setUserCourses(userCourse.data)
        }
    }

    useEffect(()=>{
        getCourses()
    },[])

    const userCourseHandler = async(isActive,id)=>{
        const response = await changeCourseStatus(isActive,id)
        if(response?.status){
            toast.success(response.message)
            setUserCourses(previous=>[...previous,id])
        }
    }

    return(
        <div className="w-full h-full pt-12 pb-8 ">
            
            <Typography variant="h4" color="blue-gray" className="mb-2 text-center">
                Courses Available
            </Typography>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 place-items-center">
            {allCourses.length ? allCourses?.map((course)=>(
                <SingleCourse key={course._id} course={course} userCourses={userCourses} userCourseHandler={userCourseHandler} />
            )) : <p>No Courses available now</p>}
            </div>
        </div>
    )
}