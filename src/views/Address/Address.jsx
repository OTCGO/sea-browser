import React from "react";
import PropTypes from "prop-types";
// @material-ui/core
import withStyles from "@material-ui/core/styles/withStyles";
import Icon from "@material-ui/core/Icon";
// @material-ui/icons
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
import { balanceApi, transactionApi } from "services/api.jsx";
import Pagination from "components/Pagination/Pagination.jsx";
import CardActions from "@material-ui/core/CardActions";
import moment from "moment";

class Address extends React.Component {
  state = {
    balanceList: [],
    transactionlist: [],
    counts: 0
  };
  async componentDidMount() {
    console.log("Address:componentDidMount", this.props.match.params.address);
    const address = this.props.match.params.address;
    const balance = await (await balanceApi(address)).data.data;
    console.log("balance", balance);

    this.setState({ balanceList: balance });

    this.getTransactionList(1, 20, address);
  }

  getTransactionList = async (currentPage = 1, pageCount = 20, address) => {
    try {
      //transcation list

      const { rows, count } = (await transactionApi(
        currentPage,
        pageCount,
        undefined,
        address
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
    return (
      <div>
        <GridContainer>
          <GridItem xs={12} sm={12} md={12}>
            <Card>
              <CardHeader color="info">
                <h4 className={classes.cardTitleWhite}>
                  地址: {this.props.match.params.address}
                </h4>
              </CardHeader>
            </Card>
          </GridItem>
        </GridContainer>
        <GridContainer>
          {this.state.balanceList.map(item => {
            if (item.balances !== "0") {
              return (
                <GridItem xs={12} sm={6} md={4} key={item.assetId}>
                  <Card>
                    <CardHeader color={getRandomColor()} icon>
                      <CardIcon color={getRandomColor()}>
                        <Icon>content_copy</Icon>
                      </CardIcon>
                      <p className={classes.cardCategory}>{item.name}</p>
                    </CardHeader>
                    <CardBody>
                      <h3 className={classes.cardTitle}>{item.balances}</h3>
                    </CardBody>
                  </Card>
                </GridItem>
              );
            }
            return null;
          })}
        </GridContainer>

        <GridContainer>
          <GridItem xs={12} sm={12} md={12}>
            <Card>
              <CardHeader color="primary">
                <h4 className={classes.cardTitleWhite}>最新交易</h4>
                <p className={classes.cardCategoryWhite}>
                  Here is a subtitle for this table
                </p>
              </CardHeader>
              <CardBody>
                <Table
                  type="transaction"
                  tableHeaderColor="primary"
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
      </div>
    );
  }
}

Address.propTypes = {
  classes: PropTypes.object.isRequired,
  match: PropTypes.object
};

export default withStyles(dashboardStyle)(Address);
