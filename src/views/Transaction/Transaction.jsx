import React from "react";
import PropTypes from "prop-types";
// @material-ui/core
import withStyles from "@material-ui/core/styles/withStyles";
import Icon from "@material-ui/core/Icon";

// core components
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardIcon from "components/Card/CardIcon.jsx";
import CardBody from "components/Card/CardBody.jsx";
import dashboardStyle from "assets/jss/material-dashboard-react/views/dashboardStyle.jsx";
import { getRandomColor } from "utils/index.jsx";
import { transactionApi } from "services/api.jsx";
import moment from "moment";
import SnackbarContent from "components/Snackbar/SnackbarContent.jsx";
import Divider from "@material-ui/core/Divider";
import { NavLink } from "react-router-dom";

class Transaction extends React.Component {
  state = {
    arrObj: [],
    scriptObj: {
      scripts: [],
      vin: [],
      vout: [],
      nep5: []
    }
  };

  async componentDidMount() {
    console.log("getTransactionListByHash", this.props.match.params.txid);
    const txid = this.props.match.params.txid;
    this.getTransactionListByHash(1, 20, txid);
  }

  getTransactionListByHash = async (currentPage = 1, pageCount = 20, txid) => {
    try {
      //transcation list

      const { rows } = (await transactionApi(
        currentPage,
        pageCount,
        undefined,
        undefined,
        txid
      )).data.data.TransactionQuery;

      const arrObj = [
        {
          name: "时间",
          value: `${moment(rows[0].time * 1000).format(
            "YYYY-MM-DD | HH:mm:ss"
          )}`,
          link: ""
        },
        {
          name: "类型",
          value: rows[0].type,
          link: ""
        },
        {
          name: "网络费用",
          value: rows[0].net_fee,
          link: ""
        },
        {
          name: "系统费用",
          value: rows[0].sys_fee,
          link: ""
        },
        {
          name: "索引",
          value: rows[0].blockIndex,
          link: ""
        },
        {
          name: "大小",
          value: rows[0].size,
          link: ""
        }
      ];

      console.log("scriptObj", rows[0]);
      this.setState({ arrObj, scriptObj: rows[0] });
    } catch (error) {
      console.log("error", error);
    }
  };

  render() {
    const { classes } = this.props;
    // console.log("scriptObj", this.state.scriptObj);
    // const addressList =

    // const addressList = this.state.scriptObj

    return (
      <div>
        <GridContainer>
          <GridItem xs={12} sm={12} md={12}>
            <Card>
              <CardHeader color="info">
                <h4 className={classes.cardTitleWhite}>
                  交易hash:
                  {this.props.match.params.txid}
                </h4>
              </CardHeader>
            </Card>
          </GridItem>
        </GridContainer>
        <GridContainer>
          {this.state.arrObj.map(item => {
            return (
              <GridItem xs={12} sm={6} md={4} key={item.name}>
                <Card>
                  <CardHeader color={getRandomColor()} stats icon>
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
              <CardHeader color="warning">
                <h4 className={classes.cardTitleWhite}>Transaction</h4>
                <p className={classes.cardCategoryWhite} />
              </CardHeader>
              <CardBody>
                <GridContainer>
                  <GridItem xs={6} sm={6} md={6}>
                    <h5>转出</h5>
                  </GridItem>

                  <GridItem xs={6} sm={6} md={6}>
                    <h5>转入</h5>
                  </GridItem>
                </GridContainer>

                <GridContainer>
                  <GridItem xs={6} sm={6} md={6}>
                    {this.state.scriptObj.vin.map(item => {
                      return (
                        <NavLink
                          to={`/address/${item.utxo.address}`}
                          key={item.utxo.asset}
                        >
                          <SnackbarContent
                            message={`${item.utxo.address}    ${
                              item.utxo.value
                            }   ${item.utxo.name}`}
                          />
                        </NavLink>
                      );
                    })}
                  </GridItem>
                  <GridItem xs={6} sm={6} md={6}>
                    {this.state.scriptObj.vout.map(item => {
                      return (
                        <NavLink
                          to={`/address/${item.address}`}
                          key={item.asset}
                        >
                          <SnackbarContent
                            message={`${item.address}    ${item.value}   ${
                              item.name
                            }`}
                          />
                        </NavLink>
                      );
                    })}
                  </GridItem>
                </GridContainer>
                <Divider />
                <br />

                {this.state.scriptObj.nep5
                  ? this.state.scriptObj.nep5.map((item, index) => {
                      return (
                        <GridContainer key={index}>
                          <GridItem xs={6} sm={6} md={6}>
                            <NavLink to={`/address/${item.from}`} key={index}>
                              <SnackbarContent
                                message={`${item.from}    ${item.value}   ${
                                  item.symbol
                                }`}
                              />
                            </NavLink>
                          </GridItem>
                          <GridItem xs={6} sm={6} md={6}>
                            <NavLink to={`/address/${item.to}`} key={index}>
                              <SnackbarContent
                                message={`${item.to}    ${item.value}   ${
                                  item.symbol
                                }`}
                              />
                            </NavLink>
                          </GridItem>
                        </GridContainer>
                      );
                    })
                  : null}
              </CardBody>
            </Card>
          </GridItem>
        </GridContainer>

        <GridContainer>
          <GridItem xs={12} sm={12} md={12}>
            <Card>
              <CardHeader color="info">
                <h4 className={classes.cardTitleWhite}>合约脚本</h4>
              </CardHeader>
              <CardBody>
                <p>
                  {this.state.scriptObj.scripts.length
                    ? this.state.scriptObj.scripts[0].invocation || ""
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
                  {this.state.scriptObj.scripts.length
                    ? this.state.scriptObj.scripts[0].verification || ""
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

Transaction.propTypes = {
  classes: PropTypes.object.isRequired,
  match: PropTypes.object
};

export default withStyles(dashboardStyle)(Transaction);
