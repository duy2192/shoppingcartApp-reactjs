export const forgotPasswordTemplate = (data) => `
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
                          Mã xác minh tài khoản
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
                                <p style="margin: 0 0 16px">Xin chào  ${data.name},</p>

                                <p style="margin: 0 0 16px">
                                  Mã xác minh bạn cần dùng để lấy lại mật khẩu tài khoản của mình (
                                  ${data.email}) là <span style="text-transform: capitalize"> :</span>
                                </p>
                                <p
                                  style="
                                    margin: 0 0 16px;
                                    font-weight: bold;
                                    font-size: 30px;
                                    text-align: center;
                                  "
                                >
                                   ${data.key}
                                </p>
                                <p style="margin: 0 0 16px">
                                  Nếu bạn không yêu cầu mã này thì có thể là ai đó đang tìm cách truy cập vào
                                  Tài khoản <i style="color: #353b48"> ${data.email}</i>.
                                  <span style="font-weight: bold"
                                    >Không chuyển tiếp hoặc cung cấp mã này cho bất kỳ ai</span
                                  >
                                </p>

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
`;
