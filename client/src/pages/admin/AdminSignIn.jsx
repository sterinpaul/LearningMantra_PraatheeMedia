import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import { adminSignIn } from '../../api/apiConnections/authAdminConnections';

import {
    Card,
    CardHeader,
    CardBody,
    Typography,
    Input,
    Button
} from "@material-tailwind/react";
import { useSetRecoilState } from 'recoil';
import { adminTokenAtom } from '../../recoil/adminAtoms';



const AdminSignIn = () => {
    const setToken = useSetRecoilState(adminTokenAtom)
    const navigate = useNavigate()

    const formik = useFormik({
        initialValues: {
            email: '',
            password: ''
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
                .required('Required')
        }),
        onSubmit: async (values) => {
            const response = await adminSignIn(values)
            if (response?.status) {
                setToken(response.data.token)
                localStorage.setItem("admin-token", response.data.token)
                navigate('/admin',{state:{id:response.data.id}})
                toast.success(response.message)
            } else {
                toast.error(response.message)
            }
        }
    })

    return (
        <div className="w-screen h-screen flex justify-center items-center">
            <Card className="w-96 shadow-2xl">
                <form onSubmit={formik.handleSubmit}>
                    <CardHeader
                        variant="gradient"
                        color="blue-gray"
                        className="mb-4 grid h-28 place-items-center"
                    >
                        <Typography variant="h3" color="white" className="font-kaushan">
                            Admin Sign in
                        </Typography>

                    </CardHeader>
                    <CardBody className="flex flex-col gap-2">
                        <div className='mb-4'>
                            <Input type="email" id="email" size="lg" label="E-mail"
                                {...formik.getFieldProps('email')} />
                            <p className="h-4 ml-2 text-sm text-red-800">{formik.touched.email && formik.errors.email ?
                                formik.errors.email : null}</p>
                        </div>
                        <Input type="password" label="Password" size="lg" id="password"
                            {...formik.getFieldProps('password')} />
                        <p className="h-4 ml-2 text-sm text-red-800">{formik.touched.password && formik.errors.password ?
                            formik.errors.password : null}</p>

                        <Button type="submit" className="mt-5" color="blue-gray" variant="gradient" fullWidth>
                            Sign In
                        </Button>

                    </CardBody>
                </form>
            </Card>
        </div>
    )
}

export default AdminSignIn