
import { HomeLifeClient} from "@/grpc/Service_home_lifeServiceClientPb"

const grpc_client = new HomeLifeClient('http://localhost:9090', null, null);

export default grpc_client;
