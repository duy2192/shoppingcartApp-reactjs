import {convertDatetime, formatPrice, getPrice} from "utils"
import {commonService} from "services"

export const newPO=(purchaseOrder,cart)=>(`
<!DOCTYPE html>
<html lang="vi">
  <head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
    <title>da29.online</title>
  </head>
  <body leftmargin="0" marginwidth="0" topmargin="0" marginheight="0" offset="0" style="padding: 0">
    <div
      id="wrapper"
      dir="ltr"
      style="
        background-color: #f7f7f7;
        margin: 0;
        padding: 70px 0;
        width: 100%;
        -webkit-text-size-adjust: none;
      "
    >
      <table border="0" cellpadding="0" cellspacing="0" height="100%" width="100%">
        <tr>
          <td align="center" valign="top">
            <div id="template_header_image"></div>
            <table
              border="0"
              cellpadding="0"
              cellspacing="0"
              width="600"
              id="template_container"
              style="
                background-color: #ffffff;
                border: 1px solid #dedede;
                box-shadow: 0 1px 4px rgba(0, 0, 0, 0.1);
                border-radius: 3px;
              "
            >
              <tr>
                <td align="center" valign="top">
                  <!-- Header -->
                  <table
                    border="0"
                    cellpadding="0"
                    cellspacing="0"
                    width="100%"
                    id="template_header"
                    style="
                      background-color: #353b48;
                      color: #ffffff;
                      border-bottom: 0;
                      font-weight: bold;
                      line-height: 100%;
                      vertical-align: middle;
                      font-family: 'Helvetica Neue', Helvetica, Roboto, Arial, sans-serif;
                      border-radius: 3px 3px 0 0;
                    "
                  >
                    <tr>
                      <td id="header_wrapper" style="padding: 36px 48px; display: block">
                        <h1
                          style="
                            font-family: 'Helvetica Neue', Helvetica, Roboto, Arial, sans-serif;
                            font-size: 30px;
                            font-weight: 300;
                            line-height: 150%;
                            margin: 0;
                            text-align: left;
                            text-shadow: 0 1px 0 #ab79a1;
                            color: #ffffff;
                            background-color: inherit;
                          "
                        >
                          Hóa đơn cho đơn hàng # ${purchaseOrder._id}
                        </h1>
                      </td>
                    </tr>
                  </table>
                  <!-- End Header -->
                </td>
              </tr>
              <tr>
                <td align="center" valign="top">
                  <!-- Body -->
                  <table border="0" cellpadding="0" cellspacing="0" width="600" id="template_body">
                    <tr>
                      <td valign="top" id="body_content" style="background-color: #ffffff">
                        <!-- Content -->
                        <table border="0" cellpadding="20" cellspacing="0" width="100%">
                          <tr>
                            <td valign="top" style="padding: 48px 48px 32px">
                              <div
                                id="body_content_inner"
                                style="
                                  color: #636363;
                                  font-family: 'Helvetica Neue', Helvetica, Roboto, Arial, sans-serif;
                                  font-size: 14px;
                                  line-height: 150%;
                                  text-align: left;
                                "
                              >
                                <p style="margin: 0 0 16px">Xin chào  purchaseOrder.name,</p>

                                <p style="margin: 0 0 16px">
                                  Đây là thông tin đơn hàng mà bạn đã mua ở
                                  <span style="text-transform: capitalize">
                                     ${convertDatetime(purchaseOrder.createdAt)}:</span
                                  >
                                </p>
                                <p style="margin: 0 0 16px">Trả tiền mặt khi giao hàng</p>

                                <h2
                                  style="
                                    color: #353b48;
                                    display: block;
                                    font-family: 'Helvetica Neue', Helvetica, Roboto, Arial, sans-serif;
                                    font-size: 18px;
                                    font-weight: bold;
                                    line-height: 130%;
                                    margin: 0 0 18px;
                                    text-align: left;
                                    text-transform: capitalize;
                                  "
                                >
                                  [Đơn hàng # ${purchaseOrder._id}] (
                                  ${convertDatetime(purchaseOrder.createdAt)})
                                </h2>

                                <div style="margin-bottom: 40px">
                                  <table
                                    class="td"
                                    cellspacing="0"
                                    cellpadding="6"
                                    border="1"
                                    style="
                                      color: #636363;
                                      border: 1px solid #e5e5e5;
                                      vertical-align: middle;
                                      width: 100%;
                                      font-family: 'Helvetica Neue', Helvetica, Roboto, Arial, sans-serif;
                                    "
                                  >
                                    <thead>
                                      <tr>
                                        <th
                                          class="td"
                                          scope="col"
                                          style="
                                            color: #636363;
                                            border: 1px solid #e5e5e5;
                                            vertical-align: middle;
                                            padding: 12px;
                                            text-align: left;
                                          "
                                        >
                                          Sản phẩm
                                        </th>
                                        <th
                                          class="td"
                                          scope="col"
                                          style="
                                            color: #636363;
                                            border: 1px solid #e5e5e5;
                                            vertical-align: middle;
                                            padding: 12px;
                                            text-align: left;
                                          "
                                        >
                                          Số lượng
                                        </th>
                                        <th
                                          class="td"
                                          scope="col"
                                          style="
                                            color: #636363;
                                            border: 1px solid #e5e5e5;
                                            vertical-align: middle;
                                            padding: 12px;
                                            text-align: left;
                                          "
                                        >
                                          Giá
                                        </th>
                                      </tr>
                                    </thead>
                                    <tbody>
                                      ${ cart.map(item=>(
                                      `
                                      <tr class="order_item">
                                        <td
                                          class="td"
                                          style="
                                            color: #636363;
                                            border: 1px solid #e5e5e5;
                                            padding: 12px;
                                            text-align: left;
                                            vertical-align: middle;
                                            font-family: 'Helvetica Neue', Helvetica, Roboto, Arial,
                                              sans-serif;
                                            word-wrap: break-word;
                                          "
                                        >
                                           ${item.product.name}
                                          <ul
                                            class="wc-item-meta"
                                            style="
                                              font-size: small;
                                              margin: 1em 0 0;
                                              padding: 0;
                                              list-style: none;
                                            "
                                          >
                                            <li style="margin: 0.5em 0 0; padding: 0">
                                              <!-- <strong class="wc-item-meta-label" style="float: left; margin-right: .25em; clear: both;">Bộ nhớ:</strong> <p style="margin: 0;">256GB</p> -->
                                            </li>
                                            <li style="margin: 0.5em 0 0; padding: 0">
                                              <!-- <strong class="wc-item-meta-label" style="float: left; margin-right: .25em; clear: both;">Màu sắc:</strong> <p style="margin: 0;">Xanh dương</p> -->
                                            </li>
                                          </ul>
                                        </td>
                                        <td
                                          class="td"
                                          style="
                                            color: #636363;
                                            border: 1px solid #e5e5e5;
                                            padding: 12px;
                                            text-align: left;
                                            vertical-align: middle;
                                            font-family: 'Helvetica Neue', Helvetica, Roboto, Arial,
                                              sans-serif;
                                          "
                                        >
                                           ${item.quantity}
                                        </td>
                                        <td
                                          class="td"
                                          style="
                                            color: #636363;
                                            border: 1px solid #e5e5e5;
                                            padding: 12px;
                                            text-align: left;
                                            vertical-align: middle;
                                            font-family: 'Helvetica Neue', Helvetica, Roboto, Arial,
                                              sans-serif;
                                          "
                                        >
                                          <span class="woocommerce-Price-amount amount">
                                             ${getPrice(item)} </span
                                          >
                                        </td>
                                      </tr>
                                      `
                                      ))}
                                    </tbody>
                                    <tfoot>
                                      <tr>
                                        <th
                                          class="td"
                                          scope="row"
                                          colspan="2"
                                          style="
                                            color: #636363;
                                            border: 1px solid #e5e5e5;
                                            vertical-align: middle;
                                            padding: 12px;
                                            text-align: left;
                                            border-top-width: 4px;
                                          "
                                        >
                                          Tổng số phụ:
                                        </th>
                                        <td
                                          class="td"
                                          style="
                                            color: #636363;
                                            border: 1px solid #e5e5e5;
                                            vertical-align: middle;
                                            padding: 12px;
                                            text-align: left;
                                            border-top-width: 4px;
                                          "
                                        >
                                          <span class="woocommerce-Price-amount amount"
                                            >${formatPrice(purchaseOrder.totalPrice)}</span
                                          >
                                        </td>
                                      </tr>
                                      <tr>
                                        <th
                                          class="td"
                                          scope="row"
                                          colspan="2"
                                          style="
                                            color: #636363;
                                            border: 1px solid #e5e5e5;
                                            vertical-align: middle;
                                            padding: 12px;
                                            text-align: left;
                                          "
                                        >
                                          Giảm giá:
                                        </th>
                                        <td
                                          class="td"
                                          style="
                                            color: #636363;
                                            border: 1px solid #e5e5e5;
                                            vertical-align: middle;
                                            padding: 12px;
                                            text-align: left;
                                          "
                                        >
                                          -<span class="woocommerce-Price-amount amount"> 0</span>
                                        </td>
                                      </tr>
                                      <tr>
                                        <th
                                          class="td"
                                          scope="row"
                                          colspan="2"
                                          style="
                                            color: #636363;
                                            border: 1px solid #e5e5e5;
                                            vertical-align: middle;
                                            padding: 12px;
                                            text-align: left;
                                          "
                                        >
                                          Phương thức thanh toán:
                                        </th>
                                        <td
                                          class="td"
                                          style="
                                            color: #636363;
                                            border: 1px solid #e5e5e5;
                                            vertical-align: middle;
                                            padding: 12px;
                                            text-align: left;
                                          "
                                        >
                                          Trả tiền mặt khi nhận hàng
                                        </td>
                                      </tr>
                                      <tr>
                                        <th
                                          class="td"
                                          scope="row"
                                          colspan="2"
                                          style="
                                            color: #636363;
                                            border: 1px solid #e5e5e5;
                                            vertical-align: middle;
                                            padding: 12px;
                                            text-align: left;
                                          "
                                        >
                                          Tổng cộng:
                                        </th>
                                        <td
                                          class="td"
                                          style="
                                            color: #636363;
                                            border: 1px solid #e5e5e5;
                                            vertical-align: middle;
                                            padding: 12px;
                                            text-align: left;
                                          "
                                        >
                                          <span class="woocommerce-Price-amount amount"
                                            > ${formatPrice(purchaseOrder.totalPrice)}</span
                                          >
                                        </td>
                                      </tr>
                                    </tfoot>
                                  </table>
                                </div>

                                <table
                                  id="addresses"
                                  cellspacing="0"
                                  cellpadding="0"
                                  border="0"
                                  style="width: 100%; vertical-align: top; margin-bottom: 40px; padding: 0"
                                >
                                  <tr>
                                    <td
                                      valign="top"
                                      width="50%"
                                      style="
                                        text-align: left;
                                        font-family: 'Helvetica Neue', Helvetica, Roboto, Arial, sans-serif;
                                        border: 0;
                                        padding: 0;
                                      "
                                    >
                                      <h2
                                        style="
                                          color: #353b48;
                                          display: block;
                                          font-family: 'Helvetica Neue', Helvetica, Roboto, Arial, sans-serif;
                                          font-size: 18px;
                                          font-weight: bold;
                                          line-height: 130%;
                                          margin: 0 0 18px;
                                          text-align: left;
                                        "
                                      >
                                        Địa chỉ thanh toán
                                      </h2>

                                      <address
                                        class="address"
                                        style="padding: 12px; color: #636363; border: 1px solid #e5e5e5"
                                      >
                                         ${purchaseOrder.name}<br />${commonService.getLabelProvinces("city",
                                        purchaseOrder.city)}<br />${commonService.getLabelProvinces("district",
                                        purchaseOrder.district)}<br />${commonService.getLabelProvinces("ward",
                                        purchaseOrder.ward)}<br /> ${purchaseOrder.address} <br />
                                        <a href="tel:" + "purchaseOrder.phone"
                                          style="color: #353b48; font-weight: normal; text-decoration:
                                          underline;"> ${purchaseOrder.phone}</a
                                        >
                                        <br /> ${purchaseOrder.email}
                                      </address>
                                    </td>
                                  </tr>
                                </table>
                                <p style="margin: 0 0 16px">Thanks for using da29.online!</p>
                              </div>
                            </td>
                          </tr>
                        </table>
                        <!-- End Content -->
                      </td>
                    </tr>
                  </table>
                  <!-- End Body -->
                </td>
              </tr>
            </table>
          </td>
        </tr>
        <tr>
          <td align="center" valign="top">
            <!-- Footer -->
            <table border="0" cellpadding="10" cellspacing="0" width="600" id="template_footer">
              <tr>
                <td valign="top" style="padding: 0; border-radius: 6px">
                  <table border="0" cellpadding="10" cellspacing="0" width="100%">
                    <tr>
                      <td
                        colspan="2"
                        valign="middle"
                        id="credit"
                        style="
                          border-radius: 6px;
                          border: 0;
                          color: #8a8a8a;
                          font-family: 'Helvetica Neue', Helvetica, Roboto, Arial, sans-serif;
                          font-size: 12px;
                          line-height: 150%;
                          text-align: center;
                          padding: 24px 0;
                        "
                      ></td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>
            <!-- End Footer -->
          </td>
        </tr>
      </table>
    </div>
  </body>
</html>
`)