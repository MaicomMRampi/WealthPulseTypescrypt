"use client"
import React from "react";
import { Tabs, Tab, Card, CardBody } from "@nextui-org/react";
import FundosImobiliarios from "@/components/investimentosComponent/fundosImobiliarios/FundosImobiliarios"
export default function App() {
    return (
        <div className="flex w-full flex-col items-center pt-8">
            <Tabs aria-label="Options">
                <Tab className="w-full" key="photos" title="Photos">
                    <FundosImobiliarios />
                </Tab>
                <Tab key="music" title="Music">
                    <Card>
                        <CardBody>
                            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                        </CardBody>
                    </Card>
                </Tab>
                <Tab key="videos" title="Videos">
                    <Card>
                        <CardBody>
                            Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                        </CardBody>
                    </Card>
                </Tab>
            </Tabs>
        </div>
    );
}
