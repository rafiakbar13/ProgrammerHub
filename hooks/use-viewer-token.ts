import { toast } from "sonner";

import { useEffect, useState } from "react";
import { JwtPayload, jwtDecode } from "jwt-decode"
import { createViewerToken } from "@/actions/token";

export const useViewerToken = (hostIdentity: string) => {
    const [token, setToken] = useState<string | null>(null);
    const [name, setName] = useState<string | null>(null);
    const [identity, setIdentity] = useState<string | null>(null);

    useEffect(() => {
        const createToken = async () => {
            try {
                const viewerToekn = await createViewerToken(hostIdentity);
                setToken(viewerToekn);

                const decodedToken = jwtDecode(viewerToekn) as JwtPayload & { name?: string };

                const name = decodedToken?.name
                const identity = decodedToken?.jti

                if (identity) {
                    setIdentity(identity);
                }
                if (name) {
                    setName(name);
                }
            } catch (error) {
                toast.error("something went wrong");
            }
        }
        createToken();
    }, [hostIdentity]);

    return { token, name, identity };
}

