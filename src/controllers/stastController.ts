import {Request, Response} from 'express';
import Stats, {StatsInt} from '../model/stats';
import mongoose from 'mongoose';

export const statsReader = async (req:Request, res:Response) => {
    const id_group = req.params.id
    const stats = await Stats.find({group_id:id_group})
    res.send(stats)
}

export const statsCreate = async (listCourse: any, fails: any) => {
    let part_per: number = 0
    let approv_per: number = 0
    let aver_grade:Number = 0
    let stand_dev:number = 0
    let best_grade:number = 0
    let worst_grade: number = 5
    for (let i=0;i < listCourse.length;i++){
        let element = listCourse[i]
        let student = String(element.student_id)
        const elem_part:number = (fails[student]*100)/32
        part_per = part_per + elem_part
        if (element.approved == true){
            approv_per = approv_per+1
        }
        aver_grade = Number(aver_grade) + Number(element.final_grade)
        if (element.final_grade > best_grade){
            best_grade = element.final_grade
        }
        if (element.final_grade < worst_grade){
            worst_grade = element.final_grade
        }
    }
    const id_group:Number = listCourse[1].group_id
    part_per = part_per/listCourse.length
    approv_per = (approv_per/listCourse.length)*100
    aver_grade = Number(aver_grade)/listCourse.length
    for (let i=0;i < listCourse.length;i++){
        let element = listCourse[i]
        stand_dev = (Number(element.final_grade) - Number(aver_grade))**2
    }
    stand_dev = Number(stand_dev)/Number(listCourse.length)
    stand_dev = Math.pow(stand_dev,1/2)
    const stats = new Stats({
        group_id:id_group,
        participation_percentage:part_per,
        aprobation_percentage:approv_per,
        average_grade:aver_grade,
        standart_deviation:stand_dev,
        best_grade:best_grade,
        worst_grade:worst_grade
    })
    await stats.save();
}