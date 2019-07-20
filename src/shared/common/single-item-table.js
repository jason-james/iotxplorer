// @flow

import React, { Component } from "react";
import type { Row } from "../../entities/common-types";
import { t } from "../../lib/iso-i18n";
import QRCode from "qrcode.react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { assetURL } from "../../lib/asset-url";

export class SingleItemTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isActive: false,
      copied: false
    };
  }

  render() {
    if (this.props.subtitle.length < 8) {
      return (
        <div className='single-col-table'>
          {this.props.subtitle ? (
            <table className='bx--data-table-v2'>
              <thead>
                <tr className='bx--parent-row-v2' data-parent-row>
                  <th className='single-col-header'>
                    {this.props.subtitle}

                    <div
                      className={
                        this.state.isActive ? "modal is-active" : "modal"
                      }
                    >
                      <div
                        className='modal-background'
                        onClick={() =>
                          this.setState({
                            isActive: false
                          })
                        }
                      />
                      />
                      <div className='modal-content'>
                        <div className='modal-card'>
                          <header className='modal-card-head'>
                            <p className='modal-card-title'>QR-Code</p>
                            <button
                              className='delete'
                              aria-label='close'
                              onClick={() =>
                                this.setState({
                                  isActive: false
                                })
                              }
                            />
                          </header>
                          <section className='modal-card-body'>
                            <div className='column'>
                              <QRCode value={this.props.subtitle} />
                            </div>
                            <div className='column'>{this.props.subtitle}</div>
                          </section>
                        </div>
                      </div>
                    </div>
                  </th>
                </tr>
              </thead>
            </table>
          ) : null}
          <table className='bx--data-table-v2'>
            <tbody>
              {this.props.rows.map((r: Row) => (
                <tr className='bx--parent-row-v2' data-parent-row>
                  <td className='header-col'>{r.c1}</td>
                  {(r.c1 !== t("response.text") && <td>{r.c2}</td>) || (
                    <td>
                      <pre dangerouslySetInnerHTML={{ __html: r.c2 }} />
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    } else {
      return (
        <div className='single-col-table'>
          {this.props.subtitle ? (
            <table className='bx--data-table-v2'>
              <thead>
                <tr className='bx--parent-row-v2' data-parent-row>
                  <th className='single-col-header'>
                    <span
                      className='qr-wrapper has-text-centered is-centered'
                      onClick={() =>
                        this.setState({
                          isActive: true
                        })
                      }
                    >
                      <img
                        style={{
                          height: "23px"
                        }}
                        src={assetURL("/qrcode.svg")}
                      />
                    </span>

                    {this.props.subtitle}

                    <div
                      className={
                        this.state.isActive ? "modal is-active" : "modal"
                      }
                    >
                      <div
                        className='modal-background'
                        onClick={() =>
                          this.setState({
                            isActive: false
                          })
                        }
                      />
                      />
                      <div className='modal-content'>
                        <div className='modal-card'>
                          <header className='modal-card-head'>
                            <p className='modal-card-title'>QR-Code</p>
                            <button
                              className='delete'
                              aria-label='close'
                              onClick={() =>
                                this.setState({
                                  isActive: false
                                })
                              }
                            />
                          </header>
                          <section className='modal-card-body'>
                            <div className='column'>
                              <QRCode value={this.props.subtitle} />
                            </div>
                            <div className='column'>{this.props.subtitle}</div>
                          </section>
                        </div>
                      </div>
                    </div>

                    <CopyToClipboard
                      text={this.props.subtitle}
                      onCopy={() => {
                        this.setState({ copied: true }, () => {
                          setTimeout(() => {
                            this.setState({ copied: false });
                          }, 1000);
                        });
                      }}
                    >
                      <span>
                        <i
                          style={{
                            marginLeft: "10px",
                            cursor: "pointer"
                          }}
                          className='far fa-copy'
                        />
                        <span
                          style={{
                            marginLeft: "5px",
                            color: "white",
                            visibility: this.state.copied ? "visible" : "hidden"
                          }}
                        >
                          <i className='fas fa-check-circle is-light' />
                        </span>
                      </span>
                    </CopyToClipboard>
                  </th>
                </tr>
              </thead>
            </table>
          ) : null}
          <table className='bx--data-table-v2'>
            <tbody>
              {this.props.rows.map((r: Row) => (
                <tr className='bx--parent-row-v2' data-parent-row>
                  <td className='header-col'>{r.c1}</td>
                  {(r.c1 !== t("response.text") && <td>{r.c2}</td>) || (
                    <td>
                      <pre dangerouslySetInnerHTML={{ __html: r.c2 }} />
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    }
  }
}
