package open.mind.its.recruitment.application.profilemanagment.EXCEPTIONS;

public class AudioNotFoundException extends RuntimeException {
    public AudioNotFoundException(String message) {
        super(message);
    }

    public AudioNotFoundException(String message, Throwable cause) {
        super(message, cause);
    }
}
