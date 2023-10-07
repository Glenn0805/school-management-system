import { Button } from '@hilla/react-components/Button.js';
import { Grid } from '@hilla/react-components/Grid.js'
import { GridColumn } from '@hilla/react-components/GridColumn.js';
import { GridSelectionColumn } from '@hilla/react-components/GridSelectionColumn.js';
import { HorizontalLayout } from '@hilla/react-components/HorizontalLayout.js';
import Student from 'Frontend/generated/com/example/application/bean/Student';
import { StudentService } from 'Frontend/generated/endpoints'
import { useEffect, useState } from 'react'
import { ActionButtonComponent } from './component/ActionButtonComponent';
import { ViewAddEditComponent } from './component/ViewAddEditComponent';

export default function StudentView() {
  const [students, setStudents] = useState<Student[]>();
  const [studentInfo, setStudentInfo] = useState<Student>({})
  const [isAddtModalOpen, setIsAddModalOpen] = useState<boolean>(false)
  const [modalType, setModalType] = useState<"add" | "edit_view">("edit_view")

  const getAllStudent = async () => {
    const response = await StudentService.getAllStudent()
    setStudents(response)

  }

  useEffect(() => {
    getAllStudent()
  }, [])

  const renderStatus = (student: Student) => {
    const statusValue = student.status === "active" ? "Active" : "Not Active";

    return (
      <span {...{ theme: `badge ${student.status === "active" ? "success" : "error"}` }}>{statusValue}</span>
    )
  }

  const toggleAddEditModal = (type: "add" | "edit_view") => {
    setModalType(type);
    setIsAddModalOpen(true)
  }

  const deleteStudentInfoHandler = async (studentId: number) => {
    await StudentService.deleteStudentInfo(studentId)
    getAllStudent()
  }

  const addStudentHandler = async (studentInfoParam: Student) => {
    await StudentService.addNewStudent(studentInfoParam);
    getAllStudent();
  }

  const updateStudentHandler = async (studentInfoParam: Student) => {
    await StudentService.updateStudentInfo(studentInfoParam);
    getAllStudent();
  }

  return (
    <>
      <section className='flex flex-col p-m pl-xl pr-xl gap-m'>
        <HorizontalLayout className='justify-end'>
          <Button onClick={() => {
            toggleAddEditModal("add")
          }} theme="primary">Add Student</Button>
        </HorizontalLayout>
        <Grid items={students} theme="row-stripes" style={{ height: '600px' }}>
          <GridSelectionColumn />
          <GridColumn header="ID" path="studentId" />
          <GridColumn path="firstName" />
          <GridColumn path="lastName" />
          <GridColumn path="section" />
          <GridColumn header="Status">
            {({ item }) => (renderStatus(item))}
          </GridColumn>
          <GridColumn header="Action" textAlign="start">
            {({ item }) => <ActionButtonComponent setStudentInfo={setStudentInfo} toggleModal={toggleAddEditModal} studentInfo={item} deleteHandler={deleteStudentInfoHandler} />
            }
          </GridColumn>
        </Grid>
      </section>
      <ViewAddEditComponent
        setStudentInfo={setStudentInfo} 
        actionType={modalType}
        updateStudentHandler={updateStudentHandler}
        addStudentHandler={addStudentHandler}
        isOpened={isAddtModalOpen}
        studentInfo={studentInfo}
        setIsOpened={setIsAddModalOpen} />
    </>
  )
}
