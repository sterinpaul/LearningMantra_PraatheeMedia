/* eslint-disable react/prop-types */
import { 
    Button,
    Typography 
} from "@material-tailwind/react";
import {
    TrashIcon
  } from "@heroicons/react/24/outline";


export const StudentListSingle = ({student,classes,index,updateStudentData,removeStudentHandler}) => {
    
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
                    {student.email}
                </Typography>
            </td>
            
            <td className={`${classes} flex gap-2 items-center justify-center`}>
                <Button onClick={()=>updateStudentData(student)} className="font-light py-2">
                    Edit
                </Button>
                <Button onClick={()=>removeStudentHandler(student._id)} className="p-2 rounded-full" color="gray">
                    <TrashIcon className="w-4 h-4 text-white"/>
                </Button>
            </td>
        </tr>
    )
}
