/* eslint-disable react/prop-types */
import { 
    Button,
    Typography 
} from "@material-tailwind/react";
import {
    TrashIcon
  } from "@heroicons/react/24/outline";


export const CourseListSingle = ({course,classes,index,updateCourseData,removeCourseHandler}) => {
    
    return (
        <tr>
            <td className={classes}>
                <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal"
                >
                    {index+1}
                </Typography>
            </td>
            <td className={classes}>
                <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal text-left"
                >
                    {course.name}
                </Typography>
            </td>
            <td className={classes}>
                <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal w-12 sm:w-48 md:w-96 lg:w-[calc(100vw-28rem)] whitespace-nowrap overflow-hidden overflow-ellipsis text-left"
                >
                    {course.description}
                </Typography>
            </td>
            <td className={`${classes} flex gap-2 items-center justify-center`}>
                <Button onClick={()=>updateCourseData(course)} className="font-light py-2">
                    Edit
                </Button>
                <Button onClick={()=>removeCourseHandler(course._id)} className="p-2 rounded-full" color="gray">
                    <TrashIcon className="w-4 h-4 text-white"/>
                </Button>
            </td>
        </tr>
    )
}
