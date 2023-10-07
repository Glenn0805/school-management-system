package com.example.application.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.application.bean.Student;
import com.example.application.dao.mapper.StudentMapper;
// import com.example.application.dao.param.StudentParam;
import com.vaadin.flow.server.auth.AnonymousAllowed;

import dev.hilla.BrowserCallable;

@BrowserCallable
@AnonymousAllowed
@Service
public class StudentService {
    
    @Autowired
    StudentMapper studentMapper;

    public List<Student> getAllStudent(){
        return studentMapper.listOfStudent();
    }
    
    public void addNewStudent(Student Student){
        studentMapper.addNewStudent(Student);
    }

    public void deleteStudentInfo(Integer studentId){
        studentMapper.deleteStudentInfo(studentId);
    }

    public void updateStudentInfo(Student Student){
        studentMapper.updateStudentInfo(Student);
    }
}
