import React from "react";
import PropTypes from "prop-types";
// @material-ui/core
import withStyles from "@material-ui/core/styles/withStyles";
import Icon from "@material-ui/core/Icon";
// @material-ui/icons
import Store from "@material-ui/icons/Store";
import moment from "moment";
// core components
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import Table from "components/Table/Table.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardIcon from "components/Card/CardIcon.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardFooter from "components/Card/CardFooter.jsx";
import Accessibility from "@material-ui/icons/Accessibility";
import dashboardStyle from "assets/jss/material-dashboard-react/views/dashboardStyle.jsx";
import Button from "components/CustomButtons/Button.jsx";
import { withRouter } from "react-router-dom";
import {
  blockApi,
  transactionApi,
  assetApi,
  systemApi
} from "services/api.jsx";
class Home extends React.Component {
  state = {
    value: 0,
    blocklist: [],
    transactionlist: [],
    assetlist: [],
    systemData: {
      startTime: "",
      curretTime: "",
      blockNum: "",
      assetNum: "",
      addressNum: "",
      transactionNum: ""
    }
  };
  handleChange = (event, value) => {
    this.setState({ value });
  };

  handleChangeIndex = index => {
    this.setState({ value: index });
  };

  async componentDidMount() {
    try {
      const systemData = (await systemApi()).data.data.SystemQuery.rows;
      console.log("systemData", systemData);
      this.setState({ systemData: systemData });

      // block list
      const blockResult = (await blockApi(undefined, 1, 10)).data.data
        .BlockQuery.rows;
      console.log("blockResult", blockResult);
      const blockArr = [];
      blockResult.forEach(item => {
        blockArr.push([
          `${item.index}`,
          `${item.transactions}`,
          `${moment(item.time * 1000).format("YYYY-MM-DD | HH:mm:ss")}`
        ]);
      });
      this.setState({ blocklist: blockArr });
      console.log("blockArr", blockArr);

      //transcation list

      const transactionResult = (await transactionApi(1, 10)).data.data
        .TransactionQuery.rows;
      console.log("transactionResult", transactionResult);
      const transactionArr = [];
      transactionResult.forEach(item => {
        transactionArr.push([
          `${item.txid}`,
          `${item.type}`,
          `${moment(item.time * 1000).format("YYYY-MM-DD | HH:mm:ss")}`
        ]);
      });
      this.setState({ transactionlist: transactionArr });
      console.log("transactionArr", transactionArr);

      //asset list
      const assetResult = (await assetApi(undefined, 1, 10)).data.data
        .AssetQuery.rows;
      console.log("assetResult", assetResult);
      const assetnArr = [];
      assetResult.forEach(item => {
        assetnArr.push([
          `${item.name[0].name}`,
          `${item.type}`,
          `${item.amount}`
        ]);
      });
      this.setState({ assetlist: assetnArr });
      console.log("assetnArr", assetnArr);
    } catch (error) {
      console.log("error", error);
    }
  }
  render() {
    const { classes } = this.props;
    return (
      <div>
        <GridContainer>
          <GridItem xs={12} sm={6} md={3}>
            <Card>
              <CardHeader color="success" stats icon>
                <CardIcon color="success">
                  <Store />
                </CardIcon>
                <p className={classes.cardCategory}>新块时间</p>
                <h3 className={classes.cardTitle}>
                  10 <small> 秒</small>
                </h3>
              </CardHeader>
            </Card>
          </GridItem>
          <GridItem xs={12} sm={6} md={3}>
            <Card>
              <CardHeader color="warning" stats icon>
                <CardIcon color="warning">
                  <Icon>content_copy</Icon>
                </CardIcon>
                <p className={classes.cardCategory}>开始时间</p>
                <h3 className={classes.cardTitle}>
                  {moment(this.state.systemData.startTime * 1000).format(
                    "YYYY-MM-DD"
                  )}
                </h3>
              </CardHeader>
            </Card>
          </GridItem>
          <GridItem xs={12} sm={6} md={3}>
            <Card>
              <CardHeader color="success" stats icon>
                <CardIcon color="success">
                  <Store />
                </CardIcon>
                <p className={classes.cardCategory}>运行时间</p>
                <h3 className={classes.cardTitle}>
                  {moment(this.state.systemData.curretTime * 1000).diff(
                    moment(this.state.systemData.startTime * 1000),
                    "days"
                  )}

                  <small> 天</small>
                </h3>
              </CardHeader>
            </Card>
          </GridItem>
          <GridItem xs={12} sm={6} md={3}>
            <Card>
              <CardHeader color="danger" stats icon>
                <CardIcon color="danger">
                  <Icon>info_outline</Icon>
                </CardIcon>
                <p className={classes.cardCategory}>资产数量</p>
                <h3 className={classes.cardTitle}>
                  {this.state.systemData.assetNum}
                </h3>
              </CardHeader>
            </Card>
          </GridItem>
        </GridContainer>

        <GridContainer>
          <GridItem xs={12} sm={6} md={3}>
            <Card>
              <CardHeader color="info" stats icon>
                <CardIcon color="info">
                  <Accessibility />
                </CardIcon>
                <p className={classes.cardCategory}>区块数量</p>
                <h3 className={classes.cardTitle}>
                  {this.state.systemData.blockNum
                    .toString()
                    .replace(/(?=((?!\b)\d{3})+$)/g, ",")}
                </h3>
              </CardHeader>
            </Card>
          </GridItem>
          <GridItem xs={12} sm={6} md={3}>
            <Card>
              <CardHeader color="warning" stats icon>
                <CardIcon color="warning">
                  <Icon>content_copy</Icon>
                </CardIcon>
                <p className={classes.cardCategory}>交易数量</p>
                <h3 className={classes.cardTitle}>
                  {" "}
                  {this.state.systemData.transactionNum
                    .toString()
                    .replace(/(?=((?!\b)\d{3})+$)/g, ",")}
                </h3>
              </CardHeader>
            </Card>
          </GridItem>
          <GridItem xs={12} sm={6} md={3}>
            <Card>
              <CardHeader color="info" stats icon>
                <CardIcon color="info">
                  <Icon>content_copy</Icon>
                </CardIcon>
                <p className={classes.cardCategory}>地址数量</p>
                <h3 className={classes.cardTitle}>
                  {this.state.systemData.addressNum
                    .toString()
                    .replace(/(?=((?!\b)\d{3})+$)/g, ",")}
                </h3>
              </CardHeader>
            </Card>
          </GridItem>
        </GridContainer>

        <GridContainer>
          <GridItem xs={12} sm={12} md={12}>
            <Card>
              <CardHeader color="success">
                <h4 className={classes.cardTitleWhite}>Blocks</h4>
                <p className={classes.cardCategoryWhite} />
              </CardHeader>
              <CardBody>
                <Table
                  type="block"
                  tableHeaderColor="success"
                  tableHead={["高度", "交易数", "时间"]}
                  tableData={this.state.blocklist}
                />
              </CardBody>
              <CardFooter>
                <Button
                  color="info"
                  onClick={() => {
                    this.props.history.push("/blocklist");
                  }}
                >
                  More
                </Button>
              </CardFooter>
            </Card>
          </GridItem>

          <GridItem xs={12} sm={12} md={12}>
            <Card>
              <CardHeader color="warning">
                <h4 className={classes.cardTitleWhite}>Transaction</h4>
                <p className={classes.cardCategoryWhite} />
              </CardHeader>
              <CardBody>
                <Table
                  type="transaction"
                  tableHeaderColor="warning"
                  tableHead={["txid", "类型", "时间"]}
                  tableData={this.state.transactionlist}
                />
              </CardBody>
              <CardFooter>
                <Button
                  color="info"
                  onClick={() => {
                    this.props.history.push("/transactionlist");
                  }}
                >
                  More
                </Button>
              </CardFooter>
            </Card>
          </GridItem>

          <GridItem xs={12} sm={12} md={12}>
            <Card>
              <CardHeader color="info">
                <h4 className={classes.cardTitleWhite}>Assets</h4>
                <p className={classes.cardCategoryWhite} />
              </CardHeader>
              <CardBody>
                <Table
                  type="asset"
                  tableHeaderColor="info"
                  tableHead={["名称", "类型", "总量"]}
                  tableData={this.state.assetlist}
                />
              </CardBody>
              <CardFooter>
                <Button
                  color="info"
                  onClick={() => {
                    this.props.history.push("/assetlist");
                  }}
                >
                  More
                </Button>
              </CardFooter>
            </Card>
          </GridItem>
        </GridContainer>
      </div>
    );
  }
}

Home.propTypes = {
  classes: PropTypes.object.isRequired,
  history: PropTypes.object
};

export default withStyles(dashboardStyle)(withRouter(Home));
