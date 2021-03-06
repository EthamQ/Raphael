Routes and how to use them:

##############################################
Overview:
1. Creating a new loodle event
router.post('/event/new', logic.createNewDoodleEvent);
2. Add a participant to an event:
router.post('/participant/:uuid', logic.addParticipantToEvent);
3. Add a date from an event to a participant:
router.post('/date/participant/add/:adminUUID', dateLogic.addDatesToParticipant);
4. Get a doodle event by its uuid
router.get('/event/:uuid', logic.getDoodleEventByUUID);
5. Update title, description, eventType, location of an event if you are the creator of an event
router.post('/event/update/:adminUUID', logic.updateDoodleEvent);
6. Delete a participant of an event
router.post('/participant/remove/:adminUUID', participantLogic.removeParticipants);
7. Add dates to an event if you are the creator
router.post('/date/add/:adminUUID', dateLogic.addDatesToEvent);
8. Delete dates of an event if you are the creator
router.post('/date/delete/:adminUUID', dateLogic.removeDatesOfEvent);
9. delete an event if you are the creator
router.post('/event/delete/:creatorUUID', logic.deleteEvent);
10. Remove a date from a participant:
router.post('/date/participant/remove/:adminUUID', dateLogic.removeDatesFromParticipant);
11. Remove dates from the creator
router.post('creator/date/remove/:adminUUID', dateLogic.removeDatesFromCreator);
12. Add dates to the creator
router.post('creator/date/add/:adminUUID', dateLogic.addDatesToCreator);
13. Update dates of the creator
router.post('creator/date/update/:adminUUID', dateLogic.updateDatesFromCreator);

##############################################
1. Creating a new loodle event
router.post('/event/new', logic.createNewDoodleEvent);
Expected data about the new event in the post request:
{
	"title": string,
    "location": string,
    "description": string,
    "eventType": string,
    "creator": {
        "name": string,
	    "email": string,
        "dates":[
            boolean //index corresponds to index in date
        ]
    },
    "date": [
    	{
    	"date": string,
        "timeFrom": string,
        "timeTo": string
    	}
    ]
}

##############################################
2. Add a participant to an event:
router.post('/participant/:uuid', logic.addParticipantToEvent);
Expected data about the new participator in the post request:
{
	"name": string,
	"email": string,
    "dates": [
        boolean //index corresponds to index in date
    ]
}
Expected data in the url: 
/:uuid 
the uuid of the event

##############################################
3. Add dates from an event to a participant:
router.post('/date/participant/add/:adminUUID', dateLogic.addDatesToParticipant);
Expected data about the date and participant in the post request,
send all the indexes of the dates you want to set to true in the dates array
of the partcipant with the corresponding id

Expected data in the url:
/:adminUUID:
the uuid of the creator, so only he can update those values

{
    "participantId": string,
    "dateIndexToAdd": [
        number
    ]
}

##############################################
4. Get a doodle event by its uuid or adminUUID
router.get('/event/:uuid', logic.getDoodleEventByUUID);
Expected data about the event in the url:
/:uuid
uuid of the event or uuid from the creator

Response from the server on success:
{
    "success": true,
    "message": "Event with the UUID found", //if admin access: "Event with the UUID found, admin access"
    "data": [
        {
            "adminAccess": boolean,
            "title": string,
            "description": string,
            "isActive": true,
            "eventType": string,
            "location": string,
            "creator": {
                "name": string,
                "email": string,
                "dates": [
                    boolean //index corresponds to index in date
                ],
                "adminUUID": string //only shown if admin access
            },
            "participants": [
                {
                    "id": string,
                    "name": string,
                    "email": string,
                    "dates": [
                        boolean //index corresponds to index in date
                    ]
                }
            ],
            "date": [
                {
                    "date": number,
                    "timeFrom": number,
                    "timeTo": number
                },
            ],
            "uuid": string,
            "url": string,
            "timestamp": number
        }
    ]
}

##############################################
5. Update title, description, eventType, location of an event if you are the creator of an event
router.post('/event/update/:creatorUUID', logic.updateDoodleEvent);
Expected data in the url:
/:creatorUUID:
the uuid of the creator, so only he can update those values

Expected data in the post request:
{
	"title": string,
    "location": string,
    "description": string,
    "eventType": string
}

##############################################
6. Delete a participant of an event
router.post('/participant/remove/:adminUUID', participantLogic.removeParticipants);

Expected data in the url:
/:adminUUID:
the adminUuid of the event

Expected data in the post request:
A array of participant ids who should be removed
{
  "participantIdArray" :[
		string
		]
}
##############################################
7. Add dates to an event if you are the creator
router.post('/date/add/:adminUUID', dateLogic.addDatesToEvent);

Expected data in the url:
/:adminUUID:
the uuid of the creator, so only he can update those values

Expected data in the post request:
{
	"datesToAdd":[
        {
        "date": number,
        "timeFrom": number,
        "timeTo": number
        }
    ]
}

##############################################
8. Delete a date of an event if you are the creator
router.post('/date/delete/:adminUUID', dateLogic.removeDatesOfEvent);

Expected data in the url:
/:adminUUID:
the uuid of the creator, so only he can update those values

Expected data in the post request (the indexes of the dates you want to delete int the date array of an event):
{
	"indexesToDelete": [
        number
    ]
}

##############################################
9. delete an event if you are the creator
router.post('/event/delete/:creatorUUID', logic.deleteEvent);

Expected data in the url:
/:creatorUUID:
the uuid of the creator, so only he can delete an event

Expected data in the post request: => empty
{ 

}

##############################################
10. Remove an event date from a participant:
router.post('/date/participant/add/:adminUUID', dateLogic.addDatesToParticipant);
Expected data about the date and participant in the post request,
send all the indexes of the dates you want to set to false in the dates array
of the partcipant with the corresponding id

Expected data in the url:
/:adminUUID:
the uuid of the creator, so only he can update those values

{
    "participantId": string,
    "dateIndexToRemove": [
        number
    ]
}

##############################################
11. Remove dates from the creator
router.post('creator/date/remove/:adminUUID', dateLogic.removeDatesFromCreator);

Expected data about the date and participant in the post request,
send all the indexes of the dates you want to set to false in the dates array
of the creator

Expected data in the url:
/:adminUUID:
the uuid of the creator, so only he can update those values

{
    "dateIndexToRemove": [
        number
    ]
}

##############################################
12. Add dates to the creator
router.post('creator/date/add/:adminUUID', dateLogic.addDatesToCreator);

Expected data about the date and participant in the post request,
send all the indexes of the dates you want to set to true in the dates array
of the creator

Expected data in the url:
/:adminUUID:
the uuid of the creator, so only he can update those values

{
    "dateIndexToAdd": [
        number
    ]
}

##############################################
13. Update dates of the creator
router.post('creator/date/update/:adminUUID', dateLogic.updateDatesFromCreator);

Just send a new date array that will replace the old one, but has to have the same length

Expected data in the url:
/:adminUUID:
the uuid of the creator, so only he can update those values

{
    "updatedDates": [
        boolean
    ]
}


##############################################





