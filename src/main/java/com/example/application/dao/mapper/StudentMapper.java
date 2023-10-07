package com.example.application.dao.mapper;

import java.util.List;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import com.example.application.bean.Student;
// import com.example.application.dao.param.StudentParam;

@Mapper
public interface StudentMapper {
   
    List <Student> listOfStudent();

    void addNewStudent(Student student);

    void deleteStudentInfo(@Param(value ="studentId") Integer studentId );

    void updateStudentInfo(Student student);
}
