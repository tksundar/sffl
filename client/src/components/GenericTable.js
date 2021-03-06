/**
 * Created by Sundar on 07-09-2020.
 * email tksrajan@gmail.com
 * Courtsey : https://gist.github.com/Lbatson/b42a30e49e6ddb946f55d26e8c895d75#file-view-js
 */
import _ from 'lodash';
import React, {Component} from 'react';
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import GlobalNavigation from "./GlobalNavigation";

class GenericTable extends Component {
    render() {
        const {columns, data} = this.props;
        console.log('columns =', columns)
        console.log('data =', data)
        // spread two-dimensional array to arguments for zip
        // destructure resulting array elements from zip
        let [names, props] = _.zip(...columns);
        // build column headers with name values
        let headers = <tr>{names.map((name, n) => <th style={{fontStyle: 'normal'}} key={n}>{name}</th>)}</tr>
        // build rows with corresponding properties from the data for each column
        let rows = data.map((item, i) => <tr key={i}>{props.map((prop, p) => <td key={p}>{item[prop]}</td>)}</tr>);

        return (
            <>
                <div className='card' style={{
                    width: "100%"
                }}>
                    <div className='card-title'>
                        <GlobalNavigation username={this.props.username}/>
                    </div>
                    <div className='card-body'>
                        <table id={"reg"} className="table-bordered table-responsive-sm" style={{
                            fontSize: "small", fontStyle: "normal"
                        }}>
                            <thead className="thead-dark">{headers}</thead>
                            <tbody>{rows}</tbody>
                        </table>

                        <div>
                            <p></p>
                            <ReactHTMLTableToExcel
                                className="btn-link"
                                table="reg"
                                filename="registrations"
                                fileEstension={'xlsx'}
                                sheet="Sheet"
                                buttonText="Download Excel"
                                />
                        </div>
                    </div>

                </div>
            </>
        );
    }
};

export default GenericTable;