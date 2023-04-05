import {UserDisplayName} from "../utilities/index.js";
import surveyAnswers from "../models/surveyAnswers.js";
import surveyModel from "../models/surveyModel.js";

export function DisplayAddAnswersPage(req, res, next){
    let id = req.params.id;

    surveyModel.findById(id, function(error, survey){
        if(error){
            console.error(error);
            res.end(error);
        }
        res.render('index', {title: 'Survey Answers', page: 'userSurvey', survey: survey, username: UserDisplayName })
    })
}

export function ProcessAddAnswersPage(req, res, next){
    let id = req.params.id;

    surveyModel.findById(id, function(error, survey){
        if(error){
            console.error(error);
            res.end(error);
        }
        else{
            if(survey){
                let newSurveyAnswers = surveyAnswers({
                    topic: req.body.topic,
                    question1: req.body.question1,
                    answer1: req.body.answer1
                });
                surveyAnswers.create(newSurveyAnswers, function(error, answers){
                    if(error){
                        console.error(error);
                        res.end(error);
                    }
                    res.redirect('/results');
                })
            }
        }
    });
}