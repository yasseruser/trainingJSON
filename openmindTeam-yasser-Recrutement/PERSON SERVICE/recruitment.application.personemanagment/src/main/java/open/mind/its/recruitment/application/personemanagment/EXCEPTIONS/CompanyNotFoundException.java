package open.mind.its.recruitment.application.personemanagment.EXCEPTIONS;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.NOT_FOUND)
public class CompanyNotFoundException extends  Exception {
    public CompanyNotFoundException(String message) {super(message);}
}
