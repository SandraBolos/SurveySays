import surveyModel from "../models/surveyModel.js";

export function DisplaySurvey(req, res, next){
    res.render('index', {title: 'Survey', page: 'survey'});
}
export function DisplaySurveyList(req, res, next){
    surveyModel.find(function (err, surveyCollection){
        if(err){
            console.error(err);
            res.end(err);
        }

        res.render('index', {title: 'Survey Questions', page: 'survey/list', survey: surveyCollection })
    })
}

//Create
export function DisplaySurveyAddPage(req, res, next){
    res.render('index', {title: 'Create a Survey', page: 'survey/edit', survey: {}})
}
export function ProcessSurveyAddPage(req, res, next){
    let newSurvey = surveyModel({
        topic: req.body.topic,
        question1: req.body.question1,
        option1: req.body.option1,
        option2: req.body.option2,
        option3: req.body.option3,
    });

    surveyModel.create(newSurvey, function(error, survey){
        if(error){
            console.error(error);
            res.end(error);
        }
        res.redirect('survey-list')
    })
}

//Update
export function DisplaySurveyEditPage(req, res, next){

    let id = req.params.id;

    surveyModel.findById(id, function(error, survey){
        if(error){
            console.error(error);
            res.end(error);
        }
        res.render('index', {title: 'Edit a Survey', page: 'survey/edit', survey})
    });
}

export function ProcessSurveyEditPage(req, res, next){
    let id = req.params.id;

    let editSurvey = surveyModel({
        _id: req.body.id,
        topic: req.body.topic,
        question1: req.body.question1,
        option1: req.body.option1,
        option2: req.body.option2,
        option3: req.body.option3,
    })

    surveyModel.updateOne({_id: id}, editSurvey, function(error, survey){
        if(error){
            console.error(error);
            res.end(error);
        }
        res.redirect('/survey-add');
    })
}

export function ProcessSurveyDelete(req, res, next){
    let id = req.params.id;

    surveyModel.remove({_id: id}, function(error){
     if(error){
         console.error(error);
         res.end(error);
     }
     res.redirect('/survey-list');
    });
}