import {
    Card,
    Typography
} from "@material-tailwind/react";


export const IntroSection = ()=>{
    return(
        <section>
            <Typography variant="h3" color="blue-gray" className="pt-24 text-center">
                Welcome to Learning Mantra
            </Typography>
            <Card className="p-6 m-4">
                <p><span className="text-blue-800 text-4xl">A</span>re you ready to elevate your career in the ever-evolving world of Information Technology ?
                    Our comprehensive IT courses are designed to equip you with the skills and knowledge necessary to thrive in this dynamic field. 
                    Whether you&apos;re a beginner looking to start a new career or a seasoned professional aiming to update your expertise, we have the perfect course for you.</p>
                
            <Typography variant="h5" color="blue" className="pt-8 text-center">
                Why Choose Our IT Courses ?
            </Typography>
            <ul className="flex flex-col gap-4 list-disc p-8">
                <li>Expert Instructors: Learn from industry professionals with years of experience and a passion for teaching.</li>
                <li>Practical Learning: Gain hands-on experience with real-world projects and case studies.</li>
                <li>Flexible Learning: Study at your own pace with our flexible online and offline course options.</li>
                <li>Cutting-Edge Curriculum: Stay ahead of the curve with courses that cover the latest technologies and industry trends.</li>
                <li>Career Support: Receive guidance on resume building, interview preparation, and job placement.</li>
            </ul>
            </Card>
            <div className="p-8">
            <Typography variant="h3" color="blue-gray" className="pt-8 text-center">
                Enroll Today
            </Typography>
            <p className="px-12 py-8 lg:px-24 lg:py-12">Join thousands of successful students who have transformed their careers with our IT courses. Whether you are looking to start a new journey or enhance your current skills, we are here to support you every step of the way. Explore our courses and start your path to a brighter future in IT today !</p>
            </div>
        </section>
    )
}