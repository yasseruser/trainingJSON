package open.mind.its.recruitment.application.profilemanagment.EXCEPTIONS;

public class CvNotFoundException extends RuntimeException {
    public CvNotFoundException(String message) {
        super(message);
    }

    public CvNotFoundException(String message, Throwable cause) {
        super(message, cause);
    }
}
