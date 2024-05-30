import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useEffect, useState } from "react"
import {
    Button,
    Card,
    Input,
    Typography,
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
    Textarea
} from "@material-tailwind/react";
import { addCourse, editCourse, getAllCourses, removeCourse } from "../../api/apiConnections/adminConnections";
import { toast } from "react-toastify";
import { CourseListSingle } from "./CourseListSingle";

const TABLE_HEAD = ["No.", "Course", "Description", "Action"];


const CourseList = () => {

    const [courses, setCourses] = useState([])
    const [open, setOpen] = useState(false)
    const [removeDialogOpen, setRemoveDialogOpen] = useState(false)
    const [removingId, setRemovingId] = useState("")

    const handleRemoveDialogOpen = ()=>setRemoveDialogOpen(!removeDialogOpen)

    const formik = useFormik({
        initialValues: {
            name: '',
            description: '',
            _id: ''
        },
        validationSchema: Yup.object().shape({
            name: Yup.string()
                .min(3, "At least 3 characters required")
                .max(20, "Maximum 20 characters allowed")
                .required('Required'),
            description: Yup.string()
                .min(3, "At least 3 characters required")
                .max(500, "Maximum 500 characters allowed")
                .required('Required'),
            _id: Yup.string()
        }),
        onSubmit: async (values) => {
            if (values._id) {
                const response = await editCourse(values)
                if (response?.status) {
                    setCourses(previous => previous.map(single => single._id === response.data._id ? response.data : single))
                    setOpen(false)
                    formik.resetForm()
                    toast.success(response.message)
                } else {
                    toast.error(response.message)
                }
            } else {
                const response = await addCourse(values)
                if (response?.status) {
                    setCourses(previous => [response.data, ...previous])
                    setOpen(false)
                    formik.resetForm()
                    toast.success(response.message)
                } else {
                    toast.error(response.message)
                }
            }
        }
    })

    const handleOpen = () => {
        setOpen(!open)
        if (!open) {
            formik.resetForm()
        }
    }

    const getCourses = async () => {
        const response = await getAllCourses()
        if (response?.status) {
            setCourses(response.data)
        }
    }

    useEffect(() => {
        getCourses()
    }, [])

    const updateCourseData = (selectedCourse) => {
        setOpen(true)
        formik.setFieldValue("name", selectedCourse.name)
        formik.setFieldValue("_id", selectedCourse._id)
        formik.setFieldValue("description", selectedCourse.description)
    }

    const removeCourseHandler = (courseId) => {
        handleRemoveDialogOpen()
        setRemovingId(courseId)
    }

    const removeACourse = async () => {
        const response = await removeCourse(removingId)
        if (response?.status) {
            setRemoveDialogOpen(false)
            setCourses(previous => previous.filter(single => single._id !== removingId))
        } else {
            toast.error(response.message)
        }
    }


    return (
        <div className="lg:px-8 px-2 pt-24 w-full flex flex-col justify-center">
            <div className='text-center mb-4'>
                <Button onClick={handleOpen} className="py-2 rounded-md text-white">Add</Button>
            </div>
            {courses.length ? <Card>
                <table>
                    <thead>
                        <tr>
                            {TABLE_HEAD.map((head) => (
                                <th
                                    key={head}
                                    className="border-b border-blue-gray-100 bg-blue-gray-50 p-4"
                                >
                                    <Typography
                                        variant="small"
                                        color="blue-gray"
                                        className="font-normal leading-none opacity-70"
                                    >
                                        {head}
                                    </Typography>
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="text-center">
                        {courses?.map((course, index) => {
                            const isLast = index === courses.length - 1;
                            const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";

                            return (
                                <CourseListSingle key={course._id} course={course} classes={classes} index={index} updateCourseData={updateCourseData} removeCourseHandler={removeCourseHandler} />
                            );
                        })}
                    </tbody>
                </table>
            </Card> : <p className='text-center pt-4'>No courses available</p>}


            <Dialog
                open={open}
                handler={handleOpen}
                animate={{
                    mount: { scale: 1, y: 0 },
                    unmount: { scale: 0.9, y: -100 },
                }}
                size='xs'
            >
                <form onSubmit={formik.handleSubmit} className='flex flex-col items-center'>
                    <DialogHeader className=''>Add Course</DialogHeader>
                    <DialogBody>
                        <div className='mb-4'>
                            <Input type="name" id="name" size="lg" label="Name"
                                {...formik.getFieldProps('name')} />
                            <p className="h-4 ml-2 text-sm text-red-800">{formik.touched.name && formik.errors.name ?
                                formik.errors.name : null}</p>
                        </div>
                        <Textarea type="description" label="Description" size="lg" id="description"
                            {...formik.getFieldProps('description')} />
                        <p className="h-4 ml-2 text-sm text-red-800">{formik.touched.description && formik.errors.description ?
                            formik.errors.description : null}</p>
                    </DialogBody>
                    <DialogFooter>
                        <Button
                            type='button'
                            variant="text"
                            color="red"
                            onClick={handleOpen}
                            className="mr-1"
                        >
                            <span>Cancel</span>
                        </Button>
                        <Button type='submit' variant="gradient" color="blue-gray">
                            Submit
                        </Button>
                    </DialogFooter>
                </form>
            </Dialog>

            <Dialog
                open={removeDialogOpen}
                handler={handleRemoveDialogOpen}
                animate={{
                    mount: { scale: 1, y: 0 },
                    unmount: { scale: 0.9, y: -100 },
                }}
                size='xs'
                className='flex flex-col items-center'
            >
                <DialogHeader>Remove Course</DialogHeader>
                <DialogBody>
                    Are you sure you want to remove the course ?
                </DialogBody>
                <DialogFooter>
                    <Button
                        variant="text"
                        color="red"
                        onClick={handleRemoveDialogOpen}
                        className="mr-1"
                    >
                        <span>Cancel</span>
                    </Button>
                    <Button onClick={removeACourse} variant="gradient" color="blue-gray">
                        Confirm
                    </Button>
                </DialogFooter>
            </Dialog>
        </div>
    )
}

export default CourseList