# Ticket Breakdown
We are a staffing company whose primary purpose is to book Agents at Shifts posted by Facilities on our platform. We're working on a new feature which will generate reports for our client Facilities containing info on how many hours each Agent worked in a given quarter by summing up every Shift they worked. Currently, this is how the process works:

- Data is saved in the database in the Facilities, Agents, and Shifts tables
- A function `getShiftsByFacility` is called with the Facility's id, returning all Shifts worked that quarter, including some metadata about the Agent assigned to each
- A function `generateReport` is then called with the list of Shifts. It converts them into a PDF which can be submitted by the Facility for compliance.

## You've been asked to work on a ticket. It reads:

**Currently, the id of each Agent on the reports we generate is their internal database id. We'd like to add the ability for Facilities to save their own custom ids for each Agent they work with and use that id when generating reports for them.**


Based on the information given, break this ticket down into 2-5 individual tickets to perform. Provide as much detail for each ticket as you can, including acceptance criteria, time/effort estimates, and implementation details. Feel free to make informed guesses about any unknown details - you can't guess "wrong".


You will be graded on the level of detail in each ticket, the clarity of the execution plan within and between tickets, and the intelligibility of your language. You don't need to be a native English speaker, but please proof-read your work.

## Your Breakdown Here

## Ticket 1
Create an API for facilities to assign custom ids to agents

**Implementation details**
- Create a POST endpoint `setAgentID(facilities_id, internal_agent_id, new_agent_id)` that will save/overwrite facility specific ID of the agent in the database
- Create a GET endpoint `getAgentID(facilities_id, internal_agent_id)` that will return the facility specific ID of the agent in the database
- Create a DELETE endpoint `deleteAgentID(facilities_id, internal_agent_id)` that will delete the facility specific ID of the agent in the database

**Time/Effort Estimate**: 1 day

**Acceptance Criteria**:
- POST endpoint should return 200 OK if successful; data should be updated for existing row in the database or a new row should be created if the agent/facility doesn't exist
- GET endpoint should return 200 OK if successful, and return the facility specific ID of the agent in the database if it exists; 404 if the agent/facility doesn't exist
- DELETE endpoint should return 200 OK; delete the facility specific ID of the agent in the database if it exists, else ignore the request

## Ticket 2
Create new database table that has composite primary key of `FacilityId` and `AgentId`. There will be an additional column called `AgentIDForFacility` that will be used to save the custom ID of the `AgentID` for the given `FacilityId`.

**Implementation Details**
- Create a new table called `FacilitySpecificAgentIDs` with the following columns:
    - `FacilityId` - INTEGER - primary key - foreign key to Facilities table
    - `AgentId` - INTEGER - primary key - foreign key to Agents table
    - `AgentIdForFacility` - VARCHAR(255) - represents the custom ID of the agent for the given facility
- Create a composite primary key of `FacilityId` and `AgentId`

**Time/Effort Estimate**: 2 hours

**Acceptance Criteria**:
- Table should be created
- Table should have composite primary key of `FacilityId` and `AgentId`
- Table should have a column called `AgentIDForFacility` that is a varchar(255)

## Ticket 3
Update `generateReport` function to use the new `FacilitySpecificAgentIDs` table to get facility specific IDs for the agents

**Implementation Details**
- Get the `facilityID` and `agentID` for the given `shiftID` from the `Shifts` table
- Query the `FacilitySpecificAgentIDs` table for the `AgentIDForFacility` for the given `facilityID` and `agentID`
- If the query returns a result, use the `AgentIDForFacility` as the agent's ID for the report, else default to using the internal `agentID`

**Time/Effort Estimate**: 1 day

**Acceptance Criteria**:
- Function should return the PDF report for the given `shiftID`
- If the `AgentIDForFacility` is not null, use the `AgentIDForFacility` as the agent's ID for the report, else default to using the internal `agentID`
