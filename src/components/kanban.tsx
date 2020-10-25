import React, {useState} from "react";
import ReactTrello from "react-trello";
import {ConverterJKanbanConfigToTrelloConfig} from "../converters/converter-jkanban-config-to-trello-config";
import {observer} from "mobx-react";
import {Config} from "../config";
import {createStyles, makeStyles} from "@material-ui/core/styles";
import AddIssueMenu from "./add-issue-menu";
import AddIssueDialog from "./add-issue-dialog";
import {AddIssueDialogStore} from "../store/add-issue-dialog-store";
import {store} from "../store/store";
import {KanbanConfig} from "../models/jkanban/kanban-config";
import {CustomCard} from "./custom-card";

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

const Kanban = observer((props: KanbanConfig) => {
  const classes = useStyles()
  const reactTrelloData = props
  if (!reactTrelloData) {
    return (<></>)
  }
  const data: ReactTrello.BoardData = ConverterJKanbanConfigToTrelloConfig(reactTrelloData);

  const [addIssueInsideStore] = useState(() => new AddIssueDialogStore())
  const addIssueInsideCallback = (issueNumber: number|null) => {
    if (issueNumber != null) {
      store.addIssueInside(issueNumber, props.number || props.title || 0)
    }
    addIssueInsideStore.hide()
  }
  const onAddIssueInsideMenuClick = () => {
    addIssueInsideStore.setIssueNumber(0)
    addIssueInsideStore.show()
  }

  const [addGroupAfterStore] = useState(() => new AddIssueDialogStore())
  const addGroupAfterCallback = (issueNumber: number|null) => {
    if (issueNumber != null) {
      store.addGroupAfter(issueNumber, props.title || props.number || 0)
    }
    addGroupAfterStore.hide()
  }
  const onAddGroupAfterMenuClick = () => {
    addGroupAfterStore.setIssueNumber(0)
    addGroupAfterStore.show()
  }

  const [addGroupBeforeStore] = useState(() => new AddIssueDialogStore())
  const addGroupBeforeCallback = (issueNumber: number|null) => {
    if (issueNumber != null) {
      store.addGroupBefore(issueNumber, props.title || props.number || 0)
    }
    addGroupBeforeStore.hide()
  }
  const onAddGroupBeforeMenuClick = () => {
    addGroupBeforeStore.setIssueNumber(0)
    addGroupBeforeStore.show()
  }

  const onTitleClick = () => {
    if (typeof props.number === 'number') {
      gotoRedmineIssue(String(props.number))
    }
  }

  return (
    <div>
      <div className={classes.groupTitleContainer}>
        <div className={classes.groupTitleText} onClick={onTitleClick}>{reactTrelloData.title}</div>
        <div>
          <AddIssueMenu
            onAddAfterClick={onAddGroupAfterMenuClick}
            onAddBeforeClick={onAddGroupBeforeMenuClick}
            onAddInsideClick={onAddIssueInsideMenuClick}
          />
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
      <AddIssueDialog data={addIssueInsideStore} callback={addIssueInsideCallback}/>
      <AddIssueDialog data={addGroupAfterStore} callback={addGroupAfterCallback}/>
      <AddIssueDialog data={addGroupBeforeStore} callback={addGroupBeforeCallback}/>
    </div>
  )
})

export default Kanban