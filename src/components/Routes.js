//navigation
import React, {Component} from 'react';
import { Text } from 'react-native';

import {Router, Stack, Scene} from 'react-native-router-flux';

import Login from '../pages/Login';
import SignUp from '../pages/SignUp';

import quesAction from '../pages/Admin/Questionnaire/Actions_Ques';

import AddQuestionnaire from '../pages/Admin/Questionnaire/AddQuestionnaire';

import addQuesTem from '../pages/Admin/Questionnaire/AddQues_Tem';

import addQuestionText from '../pages/Admin/Questionnaire/AddQuestionText_Tem';
import addQuestionRB from '../pages/Admin/Questionnaire/AddQuestionRB_Tem';
import addQuestionCB from '../pages/Admin/Questionnaire/AddQuestionCB_Tem';
import addQuesType from '../pages/Admin/Questionnaire/AddQues_Type';

import viewQuesTem from '../pages/Admin/Questionnaire/ViewQues_Tem';

import TemShow from '../pages/Admin/Questionnaire/ViewQuesTemDetails';
import TemShowUpdate from '../pages/Admin/Questionnaire/UpdateQuesTem_RBCB';
import TemUpdateText from '../pages/Admin/Questionnaire/UpdateQuesTem_Text';
import AssignQueToTeam from '../pages/Admin/Questionnaire/AssignQuesToTeam';

import AssignQToUser_Team from '../pages/Admin/Questionnaire/AssignQuesToUser_chooseTeam';
import AssignQToUser_User from '../pages/Admin/Questionnaire/AssignQuesToUser_chooseUser';


import ChooseUserToViewAnswers from '../pages/Admin/Questionnaire/ViewAnswer_UserName';
import ChooseTeamToViewAnswers from '../pages/Admin/Questionnaire/ViewAnser_Team';

import DisplayAnswers from '../pages/Admin/Questionnaire/ViewAnswerDetails';

import chooseQues2 from '../pages/Athlete/Questionnaire/Choose_Ques(user)';

import actionPhycicalData from '../pages/Admin/PhysicalData/actionChoose_PD';
import ActionDifferentCompare from '../pages/Admin/PhysicalData/actionDifferentCompare';


import viewPhycicalDataTem from '../pages/Admin/PhysicalData/ViewPhysicalDataTemplate';
import InputPDTemNewInfo from '../pages/Admin/PhysicalData/UpdatePDTemplate';
import InputPDUpdate from '../pages/Admin/PhysicalData/UpdatePD';


import addPhycicalDataTem from '../pages/Admin/PhysicalData/AddPhysicalDataTemplate';
import AddPDchooseUser from '../pages/Admin/PhysicalData/AddPD_chooseUser';
import AddPDchooseTem from '../pages/Admin/PhysicalData/AddPD_chooseTem';
import AddPDDetails from '../pages/Admin/PhysicalData/AddPD_details';
import ViewPhycicalData from '../pages/Admin/PhysicalData/ViewPhysicalData';
import CompareDifferentPDchooseUser from '../pages/Admin/PhysicalData/CompareDifferentPD_chooseUser';
import CompareDifferentPDchooseDate from '../pages/Admin/PhysicalData/CompareDifferentPD_chooseDate';
import ComparePDchooseUser from '../pages/Admin/PhysicalData/ComparePD_chooseUser';
import ComparePDchooseDate from '../pages/Admin/PhysicalData/ComparePD_chooseDate';
import ComparedResult from '../pages/Admin/PhysicalData/ComparedResult';

import TrainingActions from '../pages/Admin/Training/ActionsTraining';
import addTrainingToTeam from '../pages/Admin/Training/AddTrainingPlan(team)';
import addTrainingToAthlete from '../pages/Admin/Training/AddTrainingPlan(athlete)';
import addTrainingDetails from '../pages/Admin/Training/AddTraningPlan_Details';

import viewTrainingPlanByTeam from '../pages/Admin/Training/ViewTrainingPlan_chooseTeam';
import viewTrainingPlanByUser from '../pages/Admin/Training/ViewTrainingPlan_chooseUser';

import viewTrainingPlanTeam from '../pages/Admin/Training/ViewTrainingPlan(team)';
import viewTrainingPlanUser from '../pages/Admin/Training/ViewTrainingPlan(athlete)';


import UserControlActions from "../pages/Admin/UserControl/ActionsUserControl";
import AddUser from "../pages/Admin/UserControl/AddUser";

import UserType from "../pages/Admin/UserControl/ChooseUserType";
import ViewAthlete from "../pages/Admin/UserControl/ViewAthleteList";
import chooseTeamAssign from "../pages/Admin/UserControl/chooseTeamToAssign";
import chooseTeamModify from "../pages/Admin/UserControl/ChooseTeamToModify";
import ViewTeamMembers from "../pages/Admin/UserControl/ViewTeamMembers";
import chooseTeamToChange from "../pages/Admin/UserControl/ChooseTeamToSwitch";
import InputUserNewInfo from '../pages/Admin/UserControl/InputUpdatedUserInfo';


import ChangeUserStatus from "../pages/Admin/UserControl/(De)ActivateUser";

import AdminProfile from '../pages/Admin/Profile/Profile';


import Questions_Text from '../pages/Athlete/Questionnaire/Questions_Text';
import Questions_RB from '../pages/Athlete/Questionnaire/Questions_RB';
import Questions_CB from '../pages/Athlete/Questionnaire/Questions_CB';

import displayTraining from '../pages/Athlete/TrainingPlan/displayTraining';


import PhysicalData from '../pages/Athlete/PhysicalData/ViewPhysicalData';
import ComparedDataResult from '../pages/Athlete/PhysicalData/compardDataResult';

import UserProfile from '../pages/Athlete/Profile/Profile';
import InputNewInfo from '../pages/Athlete/Profile/InputUpdatedUserInfo';





//navigation
//inclus all the pages that display in app
//each <Scene/> is a level
//page navigate by Actions.key();

export default class Routes extends Component<{}>{  

    render(){
        const TabIcon = ({ selected, title }) => {
            return (
              <Text style={{fontSize:20 }}>{title}</Text>
            );
          }
        return(
            <Router>
                <Scene key="root" >
                    {/* the pages when not logged in */}
                    {/* if the state is !isLoggedIn */}
                    <Scene key="loggin" hideNavBar={true} initial={!this.props.isLoggedIn}>
                        <Scene key="login" component={Login} title="Login"  />
                        <Scene key="signup" component={SignUp} title="Register" />
                    </Scene>

                    {/* the pages when logged in already */}
                    {/* the state is !isLoggedIn */}
                    <Scene key="app" hideNavBar={true} initial={this.props.isLoggedIn} >
                        {/* the pages when user is admin/coach */}
                        <Scene key="admin"  hideNavBar={true} initial={this.props.isAdmin} >
                            {/* navigation bar in bottom */}
                            <Scene key="tabbar" tabs={true} tabBarStyle={{ backgroundColor: '#FFFFFF', height:30, fontSize:20 }}> 
                                {/* Questionnaire part for admin/coach */}
                                <Scene key="Questionnaire" >
                                    {/* the first page to choose action */}
                                    <Scene key="quesAction" component={quesAction} title="Questionnaires"/>

                                    {/* Add Questionnaire */}
                                    <Scene key="addQuestionnaire" component={AddQuestionnaire} title="Add New Questionnaire" />

                                    {/* Add Question */}

                                    {/* choose Template and Team */}
                                    <Scene key="addQuesTem" component={addQuesTem} title="Choose Template " />
                                    {/* choose Question Type */}
                                    <Scene key="addQuesType" component={addQuesType} title="Question Type" />
                                    {/* add Text Question */}
                                    <Scene key="addQuestionText" component={addQuestionText} title="Text Question" />
                                    {/* add RadioButton Question */} 
                                    <Scene key="addQuestionRB" component={addQuestionRB} title="Radio Button Question" />
                                    {/* add CheckBox Question */}
                                    <Scene key="addQuestionCB" component={addQuestionCB} title="Check Box Question" />
                                    {/* display Text Questions */}
                                    <Scene key="questionText" component={Questions_Text} />
                                    {/* display RadioButton Questions */}
                                    <Scene key="questionRB" component={Questions_RB} />
                                    {/* display CheckBox Questions */}
                                    <Scene key="questionCB" component={Questions_CB} />


                                    {/* View Question */}

                                    {/* choose Template */}
                                    <Scene key="viewQuesTem" component={viewQuesTem} title="Choose Template"  />
                                    {/* display this template's questions */}
                                    <Scene key="ViewTem" component={TemShow} hideNavBar={false} title="Questions"  />
                                    {/* update RadioButton/Checkbox Question*/}
                                    <Scene key="TemShowUpdate" component={TemShowUpdate} />
                                    {/* update Text Question*/}
                                    <Scene key="TemUpdateText" component={TemUpdateText} title="Update Question"/>
                                    {/* choose team to assign question template */}
                                    <Scene key="assignQuesToTeam" component={AssignQueToTeam} title="Choose Assigned Team"/>
                                    {/* choose team to get user list */}
                                    <Scene key="chooseTeam" component={AssignQToUser_Team} title="Choose Team"/>
                                    {/* choose user to assign question template */}
                                    <Scene key="chooseUserToAssignQ" component={AssignQToUser_User} title="Choose Assigned User"/>
                                    

                                    {/* View Question Answers */}

                                    {/* choose team to Display User List */}
                                    <Scene key="selectTeam" component={ChooseTeamToViewAnswers} title="Choose Team"/>
                                    {/* choose user to Display Question Answer */}
                                    <Scene key="selectUser" component={ChooseUserToViewAnswers} title="Choose User"/>
                                    {/* Display Question Answer */}
                                    <Scene key="displayAnswers" component={DisplayAnswers} title="Answers Details"/>

                                    


                                </Scene>

                                {/* TrainingData part for admin/coach */}
                                <Scene key="Traininng"  icon={TabIcon} >
                                    {/* the first page to choose action */}
                                    <Scene key="TrainingActions" component={TrainingActions} title="Training Plan" />

                                    {/* add Training Plan */}

                                    {/* choose team and date to add training plan */}
                                    <Scene key="addTrainingtoTeam" component={addTrainingToTeam} title="Add Training Plan To Team" />
                                    {/* choose single athlete and date to add training plan */}
                                    <Scene key="addTrainingtoAthlete" component={addTrainingToAthlete} title="Add Training Plan To Athlete" />
                                    {/* input specific training plan */}
                                    <Scene key="addTrainingDetails" component={addTrainingDetails} title="Add Training Plan" />

                                    {/* view Training Plan */}

                                    {/* choose team to view training plan */}
                                    <Scene key="viewTrainingPlanByTeam" component={viewTrainingPlanByTeam} title="Select Team" />
                                    {/* display training plan of this team*/}
                                    <Scene key="viewTrainingPlanTeam" component={viewTrainingPlanTeam} title="Team Training Plan" />
                                    {/* choose athlete to view training plan */}
                                    <Scene key="viewTrainingPlanByUser" component={viewTrainingPlanByUser} title="Select User" />
                                    {/* display training plan of this athlete*/}
                                    <Scene key="viewTrainingPlanUser" component={viewTrainingPlanUser} title="User Training Plan" />
                                </Scene>

                                {/* Physical Data part for admin/coach */}
                                <Scene key="PhysicalData">
                                    {/* the first page to choose action */}
                                    <Scene key="actionPD" component={actionPhycicalData} title="Physical Data" />

                                    {/* Add Physical Data Template */}
                                    <Scene key="addPhysicalDataTem" component={addPhycicalDataTem} title="Add PhysicalData Template" />

                                    {/* display Physical Data Template */}
                                    <Scene key="viewPhysicalDataTem" component={viewPhycicalDataTem} title="View PhysicalData Template" />

                                    {/* update Physical Data Template*/}
                                    <Scene key="updatePhysicalDataTem" component={InputPDTemNewInfo} title="Update PhysicalData Template" />

                                    {/* Add Physical Data */}

                                    {/* choose user to add physical data */}
                                    <Scene key="chooseUser" component={AddPDchooseUser} title="Choose User" />
                                    {/* choose template to add physical data */}
                                    <Scene key="chooseTem" component={AddPDchooseTem} title="Choose Template" />
                                    {/* add physical data details after choose user and template */}
                                    <Scene key="addPDDetails" component={AddPDDetails} title="Add PhysicalData" />

                                    {/* View Physical Data */}

                                    <Scene key="viewPhysicalData" component={ViewPhycicalData} title="Physical Data List" />

                                     {/* Update Physical Data */}
                                     <Scene key="updatePhysicalData" component={InputPDUpdate} title="Update PhysicalData" />

                                    {/* Compare Physical Data */}

                                    {/* choose to compare same/different user */}
                                    <Scene key="differentUserActions" component={ActionDifferentCompare} title="Same/Different User" />
                                    {/* choose two users to compare */}
                                    <Scene key="differentUsers" component={CompareDifferentPDchooseUser} title="Choose Two User" />
                                    {/* choose two users' data to compare  */}
                                    <Scene key="differentUsersDate" component={CompareDifferentPDchooseDate} title="Choose Users' Data" />
                                    {/* choose one user to compare */}
                                    <Scene key="comparePD_chooseuser" component={ComparePDchooseUser} title="Choose One User" />
                                    {/* choose one user's data to compare*/}
                                    <Scene key="comparePD_chooseDate" component={ComparePDchooseDate} title="Choose Compared date" />
                                    {/* display compared result */}
                                    <Scene key="ComparedResult" component={ComparedResult} title="Compared Result" />

                                </Scene>

                                {/* User Control part for admin/coach */}
                                <Scene key="UserControl" >
                                    {/* first page to choose action */}
                                    <Scene key="actionsUC"  component={UserControlActions} title="User Control"/> 

                                    {/* add new user */}
                                    <Scene key="addUser"  component={AddUser} title="Add User"/>

                                    {/* Modify User Information*/}

                                    {/* choose user type to show user list */}
                                    <Scene key="userType"  component={UserType} title="Choose User Type"/>
                                    {/* display user list after choose userType */}
                                    <Scene key="viewUser" component={ViewAthlete} title="User List"/>
                                    {/* update user Info */}
                                    <Scene key="inputUserNewInfo" component={InputUserNewInfo} title="Update User Information"/>
                                    {/* choose team to assign to user */}
                                    <Scene key="chooseTeamAssign" component={chooseTeamAssign}/>

                                    {/* Input UserName to De/Activate */}
                                    <Scene key="userStatus" component={ChangeUserStatus} title="Change User Status"/>

                                    {/* Modify Team Members */}

                                    {/* choose Team to Modify */}
                                    <Scene key="chooseTeamModify" component={chooseTeamModify} title="Check Team Members"/>
                                    {/* display team members in this team */}
                                    <Scene key="viewTeamMembers" component={ViewTeamMembers} title="Team Members"/>
                                    {/* choose a new team for user */}
                                    <Scene key="chooseNewTeam" component={chooseTeamToChange} title="Choose New Team"/>
                                    
                                </Scene>

                                {/* Profile part for admin/coach */}
                                <Scene key="Profile" hideNavBar={true} component={AdminProfile} /> 

                            </Scene>       
                        </Scene>

                            {/* the pages for athlete */}
                            <Scene key="athlete"  hideNavBar={true} initial={!this.props.isAdmin} >
                                {/* navigation bar in the bottom */}
                                <Scene key="tabbar" tabs={true} tabBarStyle={{ backgroundColor: '#FFFFFF', height:30 }}> 
                                    {/* Physical Data part for athlete */}
                                    <Scene key="PhysicalData"  >
                                        {/* display added physical data */}
                                        <Scene key="physicalData"  component={PhysicalData} title="Physical Data" />
                                        {/* display compared data reesult */}
                                        <Scene key="compareUserData"  component={ComparedDataResult} title="Compared Physical Data" />
                                    </Scene>

                                    {/* Training Plan part for athlete */}
                                    <Scene key="TrainingPlan"  >
                                        <Scene key="displayTraining"  component={displayTraining} title="Training Plan" />
                                    </Scene>

                                    {/* Questionnaire part for athlete */}
                                    <Scene key="Questionnaire"  >
                                        {/* check assigned Questionnairee */}
                                        <Scene key="userQues" component={chooseQues2} title="Question List"/>
                                        {/* check text Questionnare */}
                                        <Scene key="questionText" component={Questions_Text} title="Text" />
                                        {/* check RadioButton Questionnare */}
                                        <Scene key="questionRB" component={Questions_RB} title="Radio Button"/>
                                        {/* check CheckBox Questionnare */}
                                        <Scene key="questionCB" component={Questions_CB} title="Check Box"/>
                                    </Scene>

                                    {/* Profile part for athlete */}
                                    <Scene key="profile" >
                                        {/* display user Info */}
                                        <Scene key="userprofile" hideNavBar={true} component={UserProfile} />
                                        {/* update user Info */}
                                        <Scene key="inputNewInfo" component={InputNewInfo} title="Update User Information"/>
                                    </Scene>
             
                                </Scene>
                            </Scene>                             
                            
                    </Scene> 
                    
                </Scene>
            </Router>
        )
    }
}
