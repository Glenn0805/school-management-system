import { Button } from '@hilla/react-components/Button.js'
import { Dialog } from '@hilla/react-components/Dialog.js'
import { FormLayout } from '@hilla/react-components/FormLayout.js'
import { TextField } from '@hilla/react-components/TextField.js'
import Student from 'Frontend/generated/com/example/application/bean/Student'
import { SetStateAction } from 'react'

type Props = {
    isOpened: boolean,
    setIsOpened: React.Dispatch<SetStateAction<boolean>>,
    studentInfo: Student,
    actionType: "add" | "edit_view",
    addStudentHandler?: (Student: Student) => void,
    updateStudentHandler?: (Student: Student) => void,
    setStudentInfo: React.Dispatch<SetStateAction<Student>>
}
export const ViewAddEditComponent = (props: Props) => {
    const { isOpened, setIsOpened, studentInfo, actionType, addStudentHandler, updateStudentHandler, setStudentInfo } = props
    const headerTitle: string = actionType === "add" ? "Add Student" : `${studentInfo?.lastName || "Last Name"}, ${studentInfo?.firstName || "First Name"}`

    const closeDialog = () => {
        setIsOpened(false)
        setStudentInfo({})
    }
    const responsiveSteps = [
        { minWidth: '0', columns: 1 },
        { minWidth: '500px', columns: 2 },
    ];

    const addUpdateHandler = () => {
        if (actionType === "add") {
            addStudentHandler?.(studentInfo);
            setIsOpened(false);
        }

        if (actionType === "edit_view") {
            setStudentInfo({
                ...studentInfo,
                studentId: studentInfo?.studentId
            })
            updateStudentHandler?.(studentInfo);
            setIsOpened(false);
        }
        setStudentInfo({})
    }


    const textInputOnChangeHandler = (event: any) => {
        const name = event.target.name;
        const value = event.target.value;
        setStudentInfo(
            {
                ...studentInfo,
                [name]: value
            }
        )
        console.log(studentInfo)
    }

    return (
        <>
            <Dialog opened={isOpened}
                onOpenedChanged={({ detail }) => { setIsOpened(detail.value) }}
                headerTitle={headerTitle}
                footerRenderer={() => (
                    <>
                        <Button onClick={closeDialog}>Close</Button>
                        <Button onClick={addUpdateHandler} theme='primary'>{actionType === "add" ? "Save" : "Update"}</Button>
                    </>
                )}
            >
                <FormLayout responsiveSteps={responsiveSteps}>
                    {actionType !== "add" ? (<div {...{ colSpan: 2 }}>
                        <TextField label="Student ID" readonly value={studentInfo?.studentId?.toString()} />
                    </div>) : ""}
                    <TextField
                        required errorMessage="this is required"
                        label="First Name"
                        onInput={(e) => { textInputOnChangeHandler(e) }}
                        name='firstName'
                        value={studentInfo?.firstName || ""}
                    />
                    <TextField
                        required
                        errorMessage="this is required"
                        label="Last Name"
                        onInput={(e) => { textInputOnChangeHandler(e) }}
                        name='lastName'
                        value={studentInfo?.lastName || ""}
                    />
                    <TextField
                        required
                        errorMessage="this is required"
                        label="Section"
                        onInput={(e) => { textInputOnChangeHandler(e) }}
                        name='section'
                        value={studentInfo?.section || ""}
                    />
                </FormLayout>

            </Dialog>
        </>
    )
}
