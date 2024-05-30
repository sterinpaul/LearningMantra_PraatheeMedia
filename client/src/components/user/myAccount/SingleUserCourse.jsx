/* eslint-disable react/prop-types */
import {
    Card,
    CardBody,
    CardFooter,
    Typography,
    Button,
} from "@material-tailwind/react";


export const SingleUserCourse = ({ course,removeCourseFromUser }) => {
    const courseSelecthandler = async()=>{
        await removeCourseFromUser(course._id)
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
                <Button onClick={courseSelecthandler} >Remove</Button>
            </CardFooter>
        </Card>
    )
}