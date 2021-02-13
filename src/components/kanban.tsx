import React, {useState} from "react";
import ReactTrello from "react-trello";
import {observer} from "mobx-react";
import {Config} from "../config";
import {createStyles, makeStyles} from "@material-ui/core/styles";
import AddIssueMenu from "./add-issue-menu";
import AddIssueDialog from "./add-issue-dialog";
import {AddIssueDialogStore} from "../store/add-issue-dialog-store";
import {store} from "../store/store";
import {CustomCard} from "./custom-card";
import {CustomCardMetadataModel} from "../models/custom-card-metadata-model";
import {CustomSwimlaneModel} from "../models/custom-swimlane-model";
import {SyncSwimlaneIssuesStore} from "../store/sync-swimlane-issues-store";
import {SyncSwimlaneIssuesDialog} from "./sync-swimlane-issues-dialog";
import {SwimlaneGetIssuesDifference} from "../function/swimlane-issues-compare/swimlane-get-issues-difference";
import {SyncSwimlaneIssuesDialogStore} from "../store/sync-swimlane-issues-dialog-store";
import {AddIssueMenuStore} from "../store/add-issue-menu-store";

const useStyles = makeStyles(() =>
  createStyles({
    groupTitleContainer: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center"
    },
    groupTitleText: {
      paddingLeft: "15px",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      fontWeight: "bold",
      fontSize: "15px"
    }
  })
)

const gotoRedmineIssue = (cardId: string) => {
  const url = `${Config.redminePublicUrl}/issues/${cardId}`
  window.open(url)
}

const getSwimlaneId = (data: CustomSwimlaneModel): number|string => {
  return data.issueNumber || data.title || 0
}

const Kanban = observer((props: {data: CustomSwimlaneModel}) => {
  const classes = useStyles()
  const data: ReactTrello.BoardData<CustomCardMetadataModel> = props.data.reactTrelloConfig

  const [addIssueInsideStore] = useState(() => new AddIssueDialogStore())
  addIssueInsideStore.setCallback((issueNumber: number|null) => {
    if (issueNumber != null) {
      store.addIssueInside(issueNumber, getSwimlaneId(props.data))
    }
    addIssueInsideStore.hide()
  })
  const onAddIssueInsideMenuClick = () => {
    addIssueInsideStore.setIssueNumber(0)
    addIssueInsideStore.show()
  }

  const [addGroupAfterStore] = useState(() => new AddIssueDialogStore())
  addGroupAfterStore.setCallback((issueNumber: number|null) => {
    if (issueNumber != null) {
      store.addGroupAfter(issueNumber, getSwimlaneId(props.data))
    }
    addGroupAfterStore.hide()
  })
  const onAddGroupAfterMenuClick = () => {
    addGroupAfterStore.setIssueNumber(0)
    addGroupAfterStore.show()
  }

  const [addGroupBeforeStore] = useState(() => new AddIssueDialogStore())
  addGroupBeforeStore.setCallback((issueNumber: number|null) => {
    if (issueNumber != null) {
      store.addGroupBefore(issueNumber, getSwimlaneId(props.data))
    }
    addGroupBeforeStore.hide()
  })
  const onAddGroupBeforeMenuClick = () => {
    addGroupBeforeStore.setIssueNumber(0)
    addGroupBeforeStore.show()
  }

  const onTitleClick = () => {
    if (typeof props.data.issueNumber === 'number') {
      gotoRedmineIssue(String(props.data.issueNumber))
    }
  }

  const addIssueMenuStore = new AddIssueMenuStore()

  addIssueMenuStore.isMayBeSync = false
  addIssueMenuStore.onAddAfterClick = onAddGroupAfterMenuClick
  addIssueMenuStore.onAddBeforeClick = onAddGroupBeforeMenuClick
  addIssueMenuStore.onAddInsideClick = onAddIssueInsideMenuClick

  const syncSwimlaneIssuesDialogStore = new SyncSwimlaneIssuesDialogStore(false, (data) => {
    if (data === null) return
    store.syncIssuesInsideGroup(data, getSwimlaneId(props.data))
  })

  // init syncSwimlaneIssuesStore and loading data for syncSwimlaneIssuesStore
  const syncSwimlaneIssuesStore = new SyncSwimlaneIssuesStore()
  SwimlaneGetIssuesDifference(props.data).then(issuesDifference => {
    syncSwimlaneIssuesStore.setIssuesDifference(issuesDifference)
    addIssueMenuStore.isMayBeSync = !syncSwimlaneIssuesStore.isEmptyIssuesDifference
    addIssueMenuStore.onSyncClick = () => {
      syncSwimlaneIssuesDialogStore.setVisible(true)
    }
  }).catch(error => {
    console.error(`Error at calculate issues difference: ${error} issue #${props.data.issueNumber}`)
  })

  return (
    <div>
      <div className={classes.groupTitleContainer}>
        <div className={classes.groupTitleText} onClick={onTitleClick}>{props.data.title}</div>
        <div>
          <AddIssueMenu store={addIssueMenuStore}/>
        </div>
      </div>
      <ReactTrello
        style={{
          backgroundColor: "white",
          overflowY: "unset",
          height: "unset"
        }}
        laneStyle={{
          height: "auto",
          maxHeight: "unset"
        }}
        data={data}
        onCardClick={gotoRedmineIssue}
        components={{Card: CustomCard}}
      />
      <AddIssueDialog store={addIssueInsideStore}/>
      <AddIssueDialog store={addGroupAfterStore}/>
      <AddIssueDialog store={addGroupBeforeStore}/>
      <SyncSwimlaneIssuesDialog formStore={syncSwimlaneIssuesStore} dialogStore={syncSwimlaneIssuesDialogStore}/>
    </div>
  )
})

export default Kanban