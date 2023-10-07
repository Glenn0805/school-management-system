import { Button } from '@hilla/react-components/Button.js'
import { HorizontalLayout } from '@hilla/react-components/HorizontalLayout.js'
import Student from 'Frontend/generated/com/example/application/bean/Student'

type Props={
    studentInfo:Student,
    deleteHandler: (studentId:number)=>void,
    toggleModal: (type:"add"|"edit_view")=>void,
    setStudentInfo:React.Dispatch<Student>
}
export const ActionButtonComponent = (props:Props) => {
    const {studentInfo,deleteHandler,toggleModal,setStudentInfo}= props
    
    const toggleViewEditModal = () =>{
        toggleModal("edit_view")
        setStudentInfo(studentInfo)
    }
    
    const deleteStudentInfoHandler = ()=>{
        let studentId = studentInfo?.studentId;
        if(studentId){
            deleteHandler(studentId);
        }
       
    }

  return (
    <>
        <HorizontalLayout className='flex'>
            <Button theme="tertiary" onClick={toggleViewEditModal}>View/Edit</Button>
            <Button theme="tertiary error" onClick={deleteStudentInfoHandler}>Delete</Button>
        </HorizontalLayout>

        {/* <ViewAddEditComponent isOpened={isViewEditModalOpen} setIsOpened={setIsViewEditModalOpen} studentInfo={studentInfo} actionType='view_edit'/> */}
    </>
  )
}
