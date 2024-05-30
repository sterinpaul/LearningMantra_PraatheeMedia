import { useFormik } from 'formik';
import * as Yup from 'yup';
import lodash from 'lodash'
import { useEffect, useState } from "react"
import {
    Button,
    Card,
    Input,
    Typography,
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter
} from "@material-tailwind/react";
import { addStudent, editStudent, getAllStudents, removeStudent } from "../../api/apiConnections/adminConnections";
import { toast } from "react-toastify";
import { StudentListSingle } from "./StudentListSingle";

const TABLE_HEAD = ["No.", "E-mail", "Action"];


const StudentList = () => {

    const [students, setStudents] = useState([])
    const [editOpen, setEditOpen] = useState(false)
    const [addOpen, setAddOpen] = useState(false)
    const [removeDialogOpen, setRemoveDialogOpen] = useState(false)
    const [removingId, setRemovingId] = useState("")

    const handleRemoveDialogOpen = () => setRemoveDialogOpen(!removeDialogOpen)

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            rePassword: ''
        },
        validationSchema: Yup.object().shape({
            email: Yup.string()
                .email('Invalid email address')
                .required('Required'),
            password: Yup.string()
                .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/,
                    'Need one uppercase, one lowercase, one number, and one special character.')
                .min(6, 'Must be 6 characters or more')
                .max(12, 'Must be less than 13 characters')
                .required('Required'),
            rePassword: Yup.string()
                .oneOf([Yup.ref('password'), ''], 'Password does not match')
                .required('Required')
        }),
        onSubmit: async (values) => {
            const data = lodash.omit(values, 'rePassword')
            const response = await addStudent(data)
            if (response?.status) {
                setStudents(previous => [response.data, ...previous])
                setAddOpen(false)
                formik.resetForm()
                toast.success(response.message)
            } else {
                toast.error(response.message)
            }
        }
    })

    // Student Email updation
    const formikUpdation = useFormik({
        initialValues: {
            email: '',
            _id: ''
        },
        validationSchema: Yup.object().shape({
            email: Yup.string()
                .email('Invalid email address')
                .required('Required'),
            _id: Yup.string()
        }),
        onSubmit: async (values) => {
            const response = await editStudent(values)
            if (response?.status) {
                setStudents(previous => previous.map(single => single._id === response.data._id ? response.data : single))
                setEditOpen(false)
                formikUpdation.resetForm()
                toast.success(response.message)
            } else {
                toast.error(response.message)
            }
        }
    })

    const handleAddOpen = () => {
        setAddOpen(!addOpen)
        if (!addOpen) {
            formik.resetForm()
        }
    }

    const handleEditOpen = () => {
        setEditOpen(!editOpen)
        if (!editOpen) {
            formikUpdation.resetForm()
        }
    }

    const getStudents = async () => {
        const response = await getAllStudents()
        if (response?.status) {
            setStudents(response.data)
        }
    }

    useEffect(() => {
        getStudents()
    }, [])

    const updateStudentData = (selectedStudent) => {
        setEditOpen(true)
        formikUpdation.setFieldValue("email", selectedStudent.email)
        formikUpdation.setFieldValue("_id", selectedStudent._id)
    }

    const removeStudentHandler = (studentId) => {
        handleRemoveDialogOpen()
        setRemovingId(studentId)
    }

    const removeAStudent = async () => {
        const response = await removeStudent(removingId)
        if (response?.status) {
            setRemoveDialogOpen(false)
            setStudents(previous => previous.filter(single => single._id !== removingId))
        } else {
            toast.error(response.message)
        }
    }


    return (
        <div className="md:px-8 px-2 pt-24 w-screen flex flex-col justify-center items-center">
            <div className='text-center mb-4'>
                <Button onClick={handleAddOpen} className="py-2 rounded-md text-white">Add</Button>
            </div>
            {students.length ? <Card className='md:w-2/3 lg:1/2 w-full'>
                <table className="w-full min-w-max table-fixed">
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
                        {students?.map((student, index) => {
                            const isLast = index === students.length - 1;
                            const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";

                            return (
                                <StudentListSingle key={student._id} student={student} classes={classes} index={index} updateStudentData={updateStudentData} removeStudentHandler={removeStudentHandler} />
                            );
                        })}
                    </tbody>
                </table>
            </Card> : <p className='text-center pt-4'>No Students found</p>}


            <Dialog
                open={addOpen}
                handler={handleAddOpen}
                animate={{
                    mount: { scale: 1, y: 0 },
                    unmount: { scale: 0.9, y: -100 },
                }}
                size='xs'
            >
                <form onSubmit={formik.handleSubmit} className='flex flex-col items-center'>
                    <DialogHeader className=''>Add Student</DialogHeader>
                    <DialogBody>
                        <div className='mb-4'>
                            <Input type="email" id="email" size="lg" label="E-mail"
                                {...formik.getFieldProps('email')} />
                            <p className="h-4 ml-2 text-sm text-red-800">{formik.touched.email && formik.errors.email ?
                                formik.errors.email : null}</p>
                        </div>
                        <div className='mb-4'>
                            <Input type="password" id="password" size="lg" label="Password"
                                {...formik.getFieldProps('password')} />
                            <p className="h-4 ml-2 text-sm text-red-800">{formik.touched.password && formik.errors.password ?
                                formik.errors.password : null}</p>
                        </div>
                        <Input type="password" id="rePassword" size="lg" label="Re-type Password"
                            {...formik.getFieldProps('rePassword')} />
                        <p className="h-4 ml-2 text-sm text-red-800">{formik.touched.rePassword && formik.errors.rePassword ?
                            formik.errors.rePassword : null}</p>
                    </DialogBody>
                    <DialogFooter>
                        <Button
                            type='button'
                            variant="text"
                            color="red"
                            onClick={handleAddOpen}
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
                open={editOpen}
                handler={handleEditOpen}
                animate={{
                    mount: { scale: 1, y: 0 },
                    unmount: { scale: 0.9, y: -100 },
                }}
                size='xs'
            >
                <form onSubmit={formikUpdation.handleSubmit} className='flex flex-col items-center'>
                    <DialogHeader className=''>Update Student</DialogHeader>
                    <DialogBody>
                        <div className='mb-4'>
                            <Input type="email" id="email" size="lg" label="E-mail"
                                {...formikUpdation.getFieldProps('email')} />
                            <p className="h-4 ml-2 text-sm text-red-800">{formikUpdation.touched.email && formikUpdation.errors.email ?
                                formikUpdation.errors.email : null}</p>
                        </div>
                    </DialogBody>
                    <DialogFooter>
                        <Button
                            type='button'
                            variant="text"
                            color="red"
                            onClick={handleEditOpen}
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
                <DialogHeader>Remove Student</DialogHeader>
                <DialogBody>
                    Are you sure you want to remove the student ?
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
                    <Button onClick={removeAStudent} variant="gradient" color="blue-gray">
                        Confirm
                    </Button>
                </DialogFooter>
            </Dialog>
        </div>
    )
}

export default StudentList