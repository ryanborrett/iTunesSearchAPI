import React from "react";
import { Table } from "reactstrap";

export default function Favourite(props) {
    const { favouriteList } = props;

    return (
        <div className="favourite">
            <Table bordered dark>
                <thead>
                    <tr>
                        <th>#Favourite List</th>
                        <th>
                            <i class="fa fa-music" aria-hidden="true" />
                        </th>
                    </tr>
                </thead>
            </Table>
            <Table bordered>
                <tbody>
                    <tr className="row-container">
                        {favouriteList.map(item => {
                            return (
                                <div>
                                    <a key={item.id} href={item.link}>
                                        <td className="favourite-wraper">
                                            <img
                                                className="favourite-image"
                                                src={item.img}
                                                alt={item.title}
                                            />
                                        </td>
                                        <td className="favourite-username">{item.title}</td>
                                    </a>
                                </div>
                            );
                        })}
                    </tr>
                </tbody>
            </Table>
        </div>
    );
};
