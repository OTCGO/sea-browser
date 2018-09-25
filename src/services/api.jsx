import axios from "axios";
import { graphql, balanceUrl } from "variables/api.jsx";

export function blockApi(index, currentPage, count) {
  return axios({
    url: graphql,
    method: "post",
    data: {
      query: `{
        BlockQuery(${index ? `index:${index},` : ","}${
        currentPage ? `skip:${(currentPage - 1) * count},` : ","
      }${count ? `limit:${count},` : ","}){
            count
            rows {
            _id
            hash
            size
            version
            previousblockhash
            merkleroot
            time
            index
            nonce
            nextconsensus
            confirmations
            nextblockhash
            transactions
            createdAt
            updatedAt
            script {
                invocation
                verification
                }
            }
        }
      }
      `
    }
  });
}

export function transactionApi(currentPage, count, blockIndex, address, txid) {
  return axios({
    url: graphql,
    method: "post",
    data: {
      query: `{
        TransactionQuery(${
          currentPage ? `skip:${(currentPage - 1) * count},` : ","
        }${count ? `limit:${count},` : ","}${
        blockIndex ? `blockIndex:${blockIndex},` : ","
      }${address ? `address:"${address}",` : ","}${
        txid ? `txid:"${txid}",` : ","
      }){
          rows {
            _id
            txid
            time
            blockIndex
            size
            type
            sys_fee
            net_fee
            scripts {
              invocation
              verification
            }
            vin {
              vout
              txid
              utxo {
                address
                value
                asset
                name
              }
            }
            vout {
              address
              value
              asset
              n
              name
            }
            nep5 {
              to
              from
              symbol
              value
              operation
              assetId
            }
          }
          count
        }
      }    
        `
    }
  });
}

export function assetApi(index, currentPage, count) {
  return axios({
    url: graphql,
    method: "post",
    data: {
      query: `{
        AssetQuery(${currentPage ? `skip:${(currentPage - 1) * count},` : ","}${
        count ? `limit:${count},` : ","
      }){
            rows {
                _id
                assetId
                symbol
                type
                amount
                name {
                  lang
                  name
                }
              }
            count
          }
        }    
          `
    }
  });
}

export function systemApi() {
  return axios({
    url: graphql,
    method: "post",
    data: {
      query: `{
        SystemQuery {
          rows {
            startTime 
            curretTime 
            blockNum 
            assetNum 
            addressNum 
            transactionNum
          }
        }
      }   
      `
    }
  });
}

export function balanceApi(address) {
  return axios({
    url: `${balanceUrl}/${address}`,
    method: "get"
  });
}
