import React from "react";
import PropTypes from "prop-types";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
// core components
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import Table from "components/Table/Table.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardBody from "components/Card/CardBody.jsx";
import { transactionApi } from "services/api.jsx";
import moment from "moment";
import Pagination from "components/Pagination/Pagination.jsx";
import CardActions from "@material-ui/core/CardActions";

const styles = {
  cardCategoryWhite: {
    "&,& a,& a:hover,& a:focus": {
      color: "rgba(255,255,255,.62)",
      margin: "0",
      fontSize: "14px",
      marginTop: "0",
      marginBottom: "0"
    },
    "& a,& a:hover,& a:focus": {
      color: "#FFFFFF"
    }
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none",
    "& small": {
      color: "#777",
      fontSize: "65%",
      fontWeight: "400",
      lineHeight: "1"
    }
  }
};
class TransactionList extends React.Component {
  state = {
    value: 0,
    transactionlist: []
  };

  componentDidMount() {
    this.getTransactionList();
  }
  getTransactionList = async (currentPage = 1, count = 20) => {
    try {
      //transcation list

      const transactionResult = (await transactionApi(
        undefined,
        currentPage,
        count
      )).data.data.TransactionQuery.rows;
      console.log("transactionResult", transactionResult);
      const transactionArr = [];
      transactionResult.forEach(item => {
        transactionArr.push([
          // `${item.txid.substring(2, 6)}...${item.txid.substring(
          //   item.txid.length - 4
          // )}`,
          `${item.txid}`,
          `${item.type}`,
          `${moment(item.time * 1000).format("YYYY-MM-DD | HH:mm:ss")}`
        ]);
      });
      this.setState({ transactionlist: transactionArr });
      console.log("transactionArr", transactionArr);
    } catch (error) {
      console.log("error", error);
    }
  };

  render() {
    const { classes } = this.props;
    return (
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
              <Pagination ajaxFun={this.getTransactionList} />
            </CardActions>
          </Card>
        </GridItem>
      </GridContainer>
    );
  }
}

TransactionList.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(TransactionList);
