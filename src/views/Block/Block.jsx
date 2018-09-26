import React from "react";
import PropTypes from "prop-types";
// @material-ui/core
import withStyles from "@material-ui/core/styles/withStyles";
import Icon from "@material-ui/core/Icon";
// core components
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import Table from "components/Table/Table.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardIcon from "components/Card/CardIcon.jsx";
import CardBody from "components/Card/CardBody.jsx";
import dashboardStyle from "assets/jss/material-dashboard-react/views/dashboardStyle.jsx";
import { getRandomColor } from "utils/index.jsx";
import { blockApi, transactionApi } from "services/api.jsx";
import moment from "moment";
import Pagination from "components/Pagination/Pagination.jsx";
import CardActions from "@material-ui/core/CardActions";

class Block extends React.Component {
  state = {
    arrObj: [],
    transactionlist: [],
    counts: 0,
    scriptObj: {}
  };

  componentDidMount() {
    console.log("componentDidMount", this.props.match.params.index);
    const index = this.props.match.params.index;
    this.getBlockByIndex(index);
    this.getTransactionList();
    // console.log("componentDidMount", result);
  }

  getBlockByIndex = async index => {
    try {
      // block list
      const blockResult = (await blockApi(index)).data.data.BlockQuery.rows;
      console.log("blockResult", blockResult);

      const arrObj = [
        {
          name: "索引",
          value: blockResult[0].index,
          link: ""
        },
        {
          name: "交易数",
          value: blockResult[0].transactions,
          link: ""
        },
        {
          name: "时间",
          value: `${moment(blockResult[0].time * 1000).format(
            "YYYY-MM-DD | HH:mm:ss"
          )}`,
          link: ""
        },
        {
          name: "版本",
          value: blockResult[0].version,
          link: ""
        },
        {
          name: "大小",
          value: blockResult[0].size,
          link: ""
        }
      ];

      console.log("arrObj", arrObj);
      this.setState({ arrObj, scriptObj: blockResult[0] });
      // this.setState({ blocklist: blockArr });
    } catch (error) {
      console.log("error", error);
    }
  };

  getTransactionList = async (currentPage = 1, pageCount = 20) => {
    try {
      //transcation list

      const { rows, count } = (await transactionApi(
        currentPage,
        pageCount,
        this.props.match.params.index
      )).data.data.TransactionQuery;

      const transactionArr = [];
      rows.forEach(item => {
        transactionArr.push([
          `${item.txid}`,
          `${item.type}`,
          `${moment(item.time * 1000).format("YYYY-MM-DD | HH:mm:ss")}`
        ]);
      });
      this.setState({ transactionlist: transactionArr, counts: count });
      console.log("transactionArr", transactionArr);
    } catch (error) {
      console.log("error", error);
    }
  };

  render() {
    const { classes } = this.props;
    console.log("scriptObj", this.state.scriptObj);
    return (
      <div>
        <GridContainer>
          {this.state.arrObj.map(item => {
            return (
              <GridItem xs={12} sm={6} md={4} key={item.name}>
                <Card>
                  <CardHeader color={getRandomColor()} icon>
                    <CardIcon color={getRandomColor()}>
                      <Icon>content_copy</Icon>
                    </CardIcon>
                    <p className={classes.cardCategory}>{item.name}</p>
                  </CardHeader>
                  <CardBody>
                    <h3 className={classes.cardTitle}>{item.value}</h3>
                  </CardBody>
                </Card>
              </GridItem>
            );
          })}
        </GridContainer>

        <GridContainer>
          <GridItem xs={12} sm={12} md={12}>
            <Card>
              <CardHeader color="info">
                <h4 className={classes.cardTitleWhite}>Transaction</h4>
                <p className={classes.cardCategoryWhite} />
              </CardHeader>
              <CardBody>
                <Table
                  type="transaction"
                  tableHeaderColor="info"
                  tableHead={["txid", "类型", "时间"]}
                  tableData={this.state.transactionlist}
                />
              </CardBody>
              <CardActions>
                <Pagination
                  ajaxFun={this.getTransactionList}
                  counts={this.state.counts}
                />
              </CardActions>
            </Card>
          </GridItem>
        </GridContainer>
        <GridContainer>
          <GridItem xs={12} sm={12} md={12}>
            <Card>
              <CardHeader color="info">
                <h4 className={classes.cardTitleWhite}>散列值</h4>
              </CardHeader>
              <CardBody>
                <p>{this.state.scriptObj.hash}</p>
              </CardBody>
            </Card>
            <Card>
              <CardHeader color="info">
                <h4 className={classes.cardTitleWhite}>根散列值</h4>
              </CardHeader>
              <CardBody>
                <p>{this.state.scriptObj.merkleroot}</p>
              </CardBody>
            </Card>
            <Card>
              <CardHeader color="info">
                <h4 className={classes.cardTitleWhite}>合约脚本</h4>
              </CardHeader>
              <CardBody>
                <p>
                  {this.state.scriptObj.script
                    ? this.state.scriptObj.script.invocation || ""
                    : ""}
                </p>
              </CardBody>
            </Card>
            <Card>
              <CardHeader color="info">
                <h4 className={classes.cardTitleWhite}>验证脚本</h4>
              </CardHeader>
              <CardBody>
                <p>
                  {this.state.scriptObj.script
                    ? this.state.scriptObj.script.verification || ""
                    : ""}
                </p>
              </CardBody>
            </Card>
          </GridItem>
        </GridContainer>
      </div>
    );
  }
}

Block.propTypes = {
  classes: PropTypes.object.isRequired,
  match: PropTypes.object
};

export default withStyles(dashboardStyle)(Block);
