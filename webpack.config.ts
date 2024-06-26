import * as path from "node:path";
import {WebpackConfiguration} from "webpack-cli";
import {ModuleFederationPlugin} from "@module-federation/enhanced";

export default {
    resolve: {
        extensions: [".js", ".jsx", ".ts", ".tsx"],
        alias: {
            foo: path.resolve(__dirname, 'src/sub/foo') // here is an alias for foo
        }
    },
    plugins: [
        new ModuleFederationPlugin({
            name: 'foo',
            exposes: {
                './foo': 'foo', // not working (no dts created for src/sub/foo), even if it's an existing alias
                // './foo': './src/sub/foo', // works fine
                './bar': './src/bar'
            },
            dts: {
                generateTypes: {
                    deleteTypesFolder: false, // don't delete types folder to see the result
                }
            }
        })
    ]
} satisfies WebpackConfiguration