package allclear.allclearstate.client;

import allclear.allclearstate.domain.Farm;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;

@FeignClient(name = "farm-service", url = "192.168.31.206:3025")
public interface FarmServiceClient {
  /** pk로 farm 전송 **/
  @GetMapping("/farm")
  Farm getFarmById(Long pk);

}