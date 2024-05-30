/* eslint-disable react/prop-types */
import {
    Card,
    CardBody,
    CardFooter,
    Typography,
    Button,
} from "@material-tailwind/react";
import { useState } from "react";


export const SingleCourse = ({ course,userCourses,userCourseHandler }) => {
    const [isActive,setIsActive] = useState(userCourses?.length ? userCourses.includes(course._id) : false)
    const courseSelecthandler = async()=>{
        await userCourseHandler(isActive,course._id)
        setIsActive(previous=>!previous)
    }
    return (
        <Card className="mt-6 w-80 h-80 hover:shadow-2xl hover:shadow-blue-200">
            <CardBody className="flex flex-col items-center text-justify">
                <Typography variant="h5" color="blue-gray" className="mb-2">
                    {course.name}
                </Typography>
                <Typography className="overflow-y-scroll h-40">
                    {course.description}
                </Typography>
            </CardBody>
            <CardFooter className="pt-0 text-center">
                <Button onClick={courseSelecthandler} className={`${isActive ? "bg-black" : "bg-blue-600"} w-28`}>{isActive ? "Remove" :"Add"}</Button>
            </CardFooter>
        </Card>
    )
}