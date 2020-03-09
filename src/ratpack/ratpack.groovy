import ratpack.groovy.Groovy
import school.SchoolModule

import school.domain.*
import school.service.*

import static ratpack.groovy.Groovy.groovyTemplate
import static ratpack.jackson.Jackson.*
import ratpack.groovy.template.TextTemplateModule
import ratpack.handling.RequestLogger
import ratpack.http.Status

Groovy.ratpack {

    bindings {
        module(TextTemplateModule)
        module(SchoolModule)
    }
    handlers {

        // for logging purposes
        all(RequestLogger.ncsa())

        get {
            render(groovyTemplate([title:'Simple University'],'index.html'))
        }
        path('department/:id?'){
            DepartmentService departmentService ->
                byMethod {
                    get {
                        render(json( departmentService.findAll() ))
                    }
                    post {
                        parse(Department).then { department ->
                            render(json(departmentService.createOrUpdate( department )))
                        }
                    }
                    delete {
                        Department department = departmentService.find(pathTokens.id.toLong())
                            if (department){
                                departmentService.delete(department.id)
                                response.status(Status.OK).send()
                            } else {
                                response.status(Status.of(404)).send()
                            }
                    }
                }

        }

        path('subject/:id?'){
            SubjectService subjectService ->
                byMethod {
                    get {
                        if (pathTokens.id) {
                            render(json(subjectService.find(pathTokens.id.toLong())))
                        } else {
                            render(json(subjectService.findAll()))
                        }
                    }
                    post {
                        parse(Subject).then { subject ->
                            render(json(subjectService.createOrUpdate( subject )))
                        }
                    }
                    delete {
                        Subject subject = subjectService.find(pathTokens.id.toLong())
                        if (subject){
                            subjectService.delete(subject.id)
                            response.status(Status.OK).send()
                        } else {
                            response.status(Status.of(404)).send()
                        }
                    }
                }

        }

        path('teacher/:id?'){
            TeacherService teacherService ->
                byMethod {
                    get {
                        if (pathTokens.id) {
                            render(json(teacherService.find(pathTokens.id.toLong())))
                        } else {
                            render(json(teacherService.findAll()))
                        }
                    }
                    post {
                        parse(Teacher).then { teacher ->
                            render(json(teacherService.createOrUpdate( teacher )))
                        }
                    }
                    delete {
                        Teacher teacher = teacherService.find(pathTokens.id.toLong())
                        if (subject){
                            teacherService.delete(teacher.id)
                            response.status(Status.OK).send()
                        } else {
                            response.status(Status.of(404)).send()
                        }
                    }
                }

        }

        files {
            dir('public')
        }


    }
}